<?php
declare(strict_types=1);

require_once __DIR__ . '/../_lib/config.php';
require_once __DIR__ . '/../_lib/db.php';
require_once __DIR__ . '/../_lib/orders.php';
require_once __DIR__ . '/../_lib/pdf.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    http_response_code(405);
    echo 'Metodo no permitido';
    exit;
}

try {
    $tokenOrder = verify_order_token((string) ($_GET['token'] ?? ''));
    $order = get_order_by_id($tokenOrder['orderId']);
    $meta = get_order_payment_meta($tokenOrder['orderId']);
    if ($meta['status'] !== 'paid') {
        http_response_code(402);
        echo 'Pago pendiente';
        exit;
    }
    $pdf = build_order_pdf($order);
    header('Content-Type: application/pdf');
    header("Content-Disposition: inline; filename=\"inner-spirit-{$order['orderId']}.pdf\"");
    echo $pdf;
} catch (Throwable $e) {
    http_response_code(400);
    echo 'Token invalido';
}
