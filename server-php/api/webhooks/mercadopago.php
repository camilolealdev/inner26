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

    if (!verify_mercadopago_signature($body)) {
        http_response_code(401);
        echo json_encode(['error' => 'Firma invalida']);
        exit;
    }

    $paymentId = (string) (get_raw_query_param('data.id') ?? ($body['data']['id'] ?? ''));
    if ($paymentId === '') {
        http_response_code(202);
        echo json_encode(['received' => true, 'processed' => false]);
        exit;
    }

    $accessToken = inner_spirit_env('MERCADOPAGO_ACCESS_TOKEN');
    if (payments_missing($accessToken)) {
        throw new RuntimeException('MERCADOPAGO_ACCESS_TOKEN no configurado');
    }

    $ch = curl_init('https://api.mercadopago.com/v1/payments/' . urlencode($paymentId));
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $accessToken],
        CURLOPT_TIMEOUT => 15,
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $httpCode < 200 || $httpCode >= 300) {
        http_response_code(503);
        echo json_encode(['received' => true, 'processed' => false]);
        exit;
    }

    $payment = json_decode($response, true);
    $payment = is_array($payment) ? $payment : [];
    $status = (string) ($payment['status'] ?? '');
    if (!in_array($status, ['approved', 'rejected', 'cancelled', 'canceled'], true)) {
        http_response_code(202);
        echo json_encode(['received' => true, 'processed' => false, 'status' => $status]);
        exit;
    }

    $orderId = (string) ($payment['external_reference'] ?? '');
    try {
        $order = get_order_by_id($orderId);
    } catch (Throwable $e) {
        http_response_code(202);
        echo json_encode(['received' => true, 'processed' => false, 'reason' => 'orden desconocida']);
        exit;
    }

    $amountMatches = (float) ($payment['transaction_amount'] ?? null) === (float) $order['amount']
        && ($payment['currency_id'] ?? null) === 'COP';
    if (!$amountMatches) {
        http_response_code(409);
        echo json_encode(['error' => 'Monto no coincide']);
        exit;
    }

    $providerRef = (string) ($payment['id'] ?? $paymentId);
    if ($status === 'approved') {
        fulfill_paid_order($order['orderId'], $providerRef);
    } else {
        mark_order_status($order['orderId'], 'failed', $providerRef);
    }

    $eventType = (string) ($body['type'] ?? ($body['action'] ?? 'payment'));
    $eventId = "{$eventType}:{$providerRef}:{$status}";
    $fresh = record_webhook_event('mercadopago', $eventId, $body ?: new stdClass());
    echo json_encode(['received' => true, 'processed' => true, 'duplicate' => !$fresh]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Webhook no procesado']);
}
