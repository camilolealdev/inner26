<?php
declare(strict_types=1);

require_once __DIR__ . '/../_lib/config.php';
require_once __DIR__ . '/../_lib/db.php';
require_once __DIR__ . '/../_lib/orders.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    http_response_code(405);
    echo json_encode(['error' => 'Metodo no permitido']);
    exit;
}

try {
    $tokenOrder = verify_order_token((string) ($_GET['token'] ?? ''));
    $order = get_order_by_id($tokenOrder['orderId']);
    $meta = get_order_payment_meta($tokenOrder['orderId']);

    echo json_encode([
        'orderId' => $order['orderId'],
        'status' => $meta['status'],
        'provider' => $meta['provider'],
        'amount' => $order['amount'],
        'currency' => $order['currency'],
        'items' => array_map(static fn($item) => array_filter([
            'id' => $item['id'],
            'name' => $item['name'],
            'type' => $item['type'],
            'quantity' => $item['quantity'],
            'details' => $item['details'] ?? null,
        ], static fn($v) => $v !== null), $order['items']),
    ]);
} catch (Throwable $e) {
    http_response_code(400);
    echo json_encode(['error' => 'Token invalido']);
}
