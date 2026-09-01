<?php
declare(strict_types=1);

require_once __DIR__ . '/../_lib/config.php';
require_once __DIR__ . '/../_lib/db.php';
require_once __DIR__ . '/../_lib/fulfillment.php';
require_once __DIR__ . '/../_lib/payments.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    echo json_encode(['error' => 'Metodo no permitido']);
    exit;
}

try {
    $rawBody = file_get_contents('php://input');
    $body = json_decode($rawBody, true);
    $body = is_array($body) ? $body : [];

    $checksumHeader = $_SERVER['HTTP_X_EVENT_CHECKSUM'] ?? null;
    if (!verify_wompi_event($body, $checksumHeader)) {
        http_response_code(401);
        echo json_encode(['error' => 'Checksum invalido']);
        exit;
    }

    $transaction = $body['data']['transaction'] ?? null;
    $transaction = is_array($transaction) ? $transaction : [];
    $status = (string) ($transaction['status'] ?? '');
    $eventName = (string) ($body['event'] ?? 'wompi-event');

    if (empty($transaction['id']) || empty($transaction['reference'])) {
        http_response_code(202);
        echo json_encode(['received' => true, 'processed' => false]);
        exit;
    }

    if (!in_array($status, ['APPROVED', 'DECLINED', 'VOIDED', 'ERROR'], true)) {
        http_response_code(202);
        echo json_encode(['received' => true, 'processed' => false, 'status' => $status]);
        exit;
    }

    $eventId = "{$eventName}:{$transaction['id']}:{$status}";
    try {
        $order = get_order_by_id((string) $transaction['reference']);
    } catch (Throwable $e) {
        http_response_code(202);
        echo json_encode(['received' => true, 'processed' => false, 'reason' => 'orden desconocida']);
        exit;
    }

    $amountMatches = (int) ($transaction['amount_in_cents'] ?? null) === (int) $order['amountInCents']
        && ($transaction['currency'] ?? null) === 'COP';
    if (!$amountMatches) {
        http_response_code(409);
        echo json_encode(['error' => 'Monto no coincide']);
        exit;
    }

    if ($status === 'APPROVED') {
        fulfill_paid_order($order['orderId'], (string) $transaction['id']);
    } else {
        mark_order_status($order['orderId'], 'failed', (string) $transaction['id']);
    }

    $fresh = record_webhook_event('wompi', $eventId, $body ?: new stdClass());
    echo json_encode(['received' => true, 'processed' => true, 'duplicate' => !$fresh]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Webhook no procesado']);
}
