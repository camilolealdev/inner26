<?php
declare(strict_types=1);

require_once __DIR__ . '/_lib/config.php';
require_once __DIR__ . '/_lib/catalog.php';
require_once __DIR__ . '/_lib/db.php';
require_once __DIR__ . '/_lib/orders.php';
require_once __DIR__ . '/_lib/payments.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    echo json_encode(['error' => 'Metodo no permitido']);
    exit;
}

function checkout_clean_customer(array $customer): array
{
    $name = trim((string) ($customer['name'] ?? ''));
    $email = strtolower(trim((string) ($customer['email'] ?? '')));
    $phone = trim((string) ($customer['phone'] ?? ''));
    if (mb_strlen($name) < 2) {
        throw new RuntimeException('Nombre requerido');
    }
    if (!preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email)) {
        throw new RuntimeException('Email invalido');
    }
    $result = ['name' => $name, 'email' => $email];
    if ($phone !== '') {
        $result['phone'] = $phone;
    }
    return $result;
}

function checkout_clean_fulfillment($raw, bool $hasProducts): ?array
{
    if (!$hasProducts) {
        return null;
    }
    $raw = is_array($raw) ? $raw : [];
    $type = ($raw['type'] ?? null) === 'delivery' ? 'delivery' : 'pickup';
    $address = mb_substr(trim((string) ($raw['address'] ?? '')), 0, 240, 'UTF-8');
    if ($type === 'delivery' && mb_strlen($address) < 8) {
        throw new RuntimeException('Direccion de entrega requerida');
    }
    return $type === 'delivery' ? ['type' => $type, 'address' => $address] : ['type' => $type];
}

function checkout_client_message(Throwable $error): string
{
    $message = $error->getMessage();
    $allowed = [
        'Nombre requerido', 'Email invalido', 'Direccion de entrega requerida',
        'Carrito vacio', 'Tipo de item invalido', 'Precio invalido',
        'Proveedor invalido', 'Proveedor no soportado',
    ];
    if (in_array($message, $allowed, true)
        || str_starts_with($message, 'Producto no permitido')
        || str_starts_with($message, 'Reserva no permitida')) {
        return $message;
    }
    if (str_contains($message, 'Idempotency-Key')) {
        return 'Solicitud de pago duplicada con datos distintos';
    }
    return 'No se pudo crear el pago. Intenta nuevamente.';
}

try {
    $body = json_decode(file_get_contents('php://input'), true);
    $body = is_array($body) ? $body : [];

    $provider = (string) ($body['provider'] ?: 'mercadopago');
    if (!in_array($provider, ['mercadopago', 'wompi'], true)) {
        http_response_code(400);
        echo json_encode(['error' => 'Proveedor invalido']);
        exit;
    }

    $customer = checkout_clean_customer(is_array($body['customer'] ?? null) ? $body['customer'] : []);
    $items = normalize_checkout_items($body['items'] ?? null);
    $hasProducts = false;
    foreach ($items as $item) {
        if ($item['type'] === 'product') {
            $hasProducts = true;
            break;
        }
    }
    $fulfillment = checkout_clean_fulfillment($body['fulfillment'] ?? null, $hasProducts);

    $order = create_order_snapshot($provider, $customer, $items, $fulfillment);
    $token = sign_order($order);
    $idempotencyKey = (string) ($_SERVER['HTTP_IDEMPOTENCY_KEY'] ?: ($body['idempotencyKey'] ?: $order['orderId']));
    $payloadHash = hash_payload([
        'provider' => $provider,
        'customer' => $customer,
        'fulfillment' => $fulfillment,
        'items' => $items,
    ]);

    $persistedOrder = create_order_record($order, $token, $idempotencyKey, $payloadHash);
    $persistedToken = sign_order($persistedOrder);
    $baseUrl = get_base_url();
    $existingPayment = get_order_payment_meta($persistedOrder['orderId']);

    if (!empty($existingPayment['checkoutUrl'])) {
        echo json_encode([
            'orderId' => $persistedOrder['orderId'],
            'provider' => $existingPayment['provider'],
            'status' => $existingPayment['status'],
            'checkoutUrl' => $existingPayment['checkoutUrl'],
            'providerReference' => $existingPayment['providerReference'],
        ]);
        exit;
    }

    if ($provider === 'mercadopago') {
        $preference = create_mercadopago_preference($persistedOrder, $persistedToken, $baseUrl);
        attach_checkout_to_order($persistedOrder['orderId'], $preference['providerReference'], $preference['checkoutUrl']);
        echo json_encode(array_merge(
            ['orderId' => $persistedOrder['orderId'], 'provider' => $provider, 'status' => 'pending'],
            $preference
        ));
        exit;
    }

    if ($provider === 'wompi') {
        $checkout = create_wompi_checkout($persistedOrder, $persistedToken, $baseUrl);
        attach_checkout_to_order($persistedOrder['orderId'], $checkout['providerReference'], $checkout['checkoutUrl']);
        echo json_encode(array_merge(
            ['orderId' => $persistedOrder['orderId'], 'provider' => $provider, 'status' => 'pending'],
            $checkout
        ));
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'Proveedor no soportado']);
} catch (Throwable $error) {
    http_response_code(400);
    echo json_encode(['error' => checkout_client_message($error)]);
}
