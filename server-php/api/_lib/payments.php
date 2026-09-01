<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

function payments_missing(?string $value): bool
{
    return !$value || str_starts_with($value, 'replace-with-') || str_starts_with($value, 'change-me');
}

function create_mercadopago_preference(array $order, string $token, string $baseUrl): array
{
    $accessToken = inner_spirit_env('MERCADOPAGO_ACCESS_TOKEN');
    if (payments_missing($accessToken)) {
        throw new RuntimeException('MERCADOPAGO_ACCESS_TOKEN no configurado');
    }

    $items = array_map(static fn($item) => array_filter([
        'id' => $item['id'],
        'title' => $item['name'],
        'description' => $item['details'] ?? null,
        'quantity' => $item['quantity'],
        'unit_price' => $item['unitPrice'],
        'currency_id' => 'COP',
    ], static fn($v) => $v !== null), $order['items']);

    $payer = [
        'name' => $order['customer']['name'],
        'email' => $order['customer']['email'],
    ];
    if (!empty($order['customer']['phone'])) {
        $payer['phone'] = ['number' => $order['customer']['phone']];
    }

    $body = [
        'items' => $items,
        'payer' => $payer,
        'external_reference' => $order['orderId'],
        'metadata' => ['order_id' => $order['orderId']],
        'notification_url' => "{$baseUrl}/api/webhooks/mercadopago",
        'back_urls' => [
            'success' => "{$baseUrl}/api/orders/confirm?token=" . urlencode($token) . '&provider=mercadopago',
            'failure' => "{$baseUrl}/api/orders/confirm?token=" . urlencode($token) . '&provider=mercadopago&status=failed',
            'pending' => "{$baseUrl}/api/orders/confirm?token=" . urlencode($token) . '&provider=mercadopago&status=pending',
        ],
        'auto_return' => 'approved',
    ];

    $ch = curl_init('https://api.mercadopago.com/checkout/preferences');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $accessToken,
            'Content-Type: application/json',
            'X-Idempotency-Key: ' . $order['orderId'],
        ],
        CURLOPT_POSTFIELDS => json_encode($body, JSON_UNESCAPED_UNICODE),
        CURLOPT_TIMEOUT => 15,
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($response === false) {
        throw new RuntimeException("MercadoPago request fallo: {$curlError}");
    }

    $data = json_decode($response, true) ?? [];
    if ($httpCode < 200 || $httpCode >= 300) {
        throw new RuntimeException($data['message'] ?? 'MercadoPago rechazo la preferencia');
    }

    return [
        'checkoutUrl' => $data['init_point'] ?? ($data['sandbox_init_point'] ?? null),
        'providerReference' => $data['id'],
    ];
}

function create_wompi_checkout(array $order, string $token, string $baseUrl): array
{
    $publicKey = inner_spirit_env('WOMPI_PUBLIC_KEY');
    $integrityKey = inner_spirit_env('WOMPI_INTEGRITY_KEY') ?? inner_spirit_env('WOMPI_INTEGRITY_SECRET');
    if (payments_missing($publicKey) || payments_missing($integrityKey)) {
        throw new RuntimeException('WOMPI_PUBLIC_KEY/WOMPI_INTEGRITY_KEY no configurado');
    }

    $signature = hash('sha256', $order['orderId'] . $order['amountInCents'] . 'COP' . $integrityKey);

    $params = [
        'public-key' => $publicKey,
        'currency' => 'COP',
        'amount-in-cents' => (string) $order['amountInCents'],
        'reference' => $order['orderId'],
        'signature:integrity' => $signature,
        'redirect-url' => "{$baseUrl}/api/orders/confirm?token=" . urlencode($token) . '&provider=wompi',
        'customer-data:email' => $order['customer']['email'],
        'customer-data:full-name' => $order['customer']['name'],
    ];

    if (!empty($order['customer']['phone'])) {
        $params['customer-data:phone-number'] = preg_replace('/^\+?57/', '', $order['customer']['phone']);
        $params['customer-data:phone-number-prefix'] = '+57';
    }

    $checkoutBase = inner_spirit_env('WOMPI_CHECKOUT_URL', 'https://checkout.wompi.co/p/');
    return [
        'checkoutUrl' => $checkoutBase . '?' . http_build_query($params),
        'providerReference' => $order['orderId'],
    ];
}

function verify_mercadopago_signature(?array $body = null): bool
{
    $secret = inner_spirit_env('MERCADOPAGO_WEBHOOK_SECRET');
    if (payments_missing($secret)) {
        throw new RuntimeException('MERCADOPAGO_WEBHOOK_SECRET no configurado');
    }

    $signature = $_SERVER['HTTP_X_SIGNATURE'] ?? '';
    $requestId = $_SERVER['HTTP_X_REQUEST_ID'] ?? '';
    $parts = explode(',', $signature);
    $tsPart = $parts[0] ?? null;
    $hashPart = $parts[1] ?? null;
    $ts = $tsPart !== null ? (explode('=', $tsPart, 2)[1] ?? null) : null;
    $hash = $hashPart !== null ? (explode('=', $hashPart, 2)[1] ?? null) : null;

    $dataId = get_raw_query_param('data.id');
    if ($dataId === null && $body !== null) {
        $dataId = $body['data']['id'] ?? null;
    }

    if (!$ts || !$hash || !$dataId) {
        return false;
    }

    $manifest = "id:{$dataId};request-id:{$requestId};ts:{$ts};";
    $expected = hash_hmac('sha256', $manifest, $secret);
    return hash_equals($expected, (string) $hash);
}

function get_nested_value(array $data, string $path)
{
    $current = $data;
    foreach (explode('.', $path) as $key) {
        if (!is_array($current) || !array_key_exists($key, $current)) {
            return null;
        }
        $current = $current[$key];
    }
    return $current;
}

function verify_wompi_event(array $event, ?string $headerChecksum): bool
{
    $secret = inner_spirit_env('WOMPI_EVENTS_SECRET');
    if (payments_missing($secret)) {
        throw new RuntimeException('WOMPI_EVENTS_SECRET no configurado');
    }

    $properties = $event['signature']['properties'] ?? null;
    $checksum = $headerChecksum ?? ($event['signature']['checksum'] ?? null);
    if (!is_array($properties) || !$checksum) {
        return false;
    }

    $values = '';
    foreach ($properties as $path) {
        $values .= (string) (get_nested_value($event['data'] ?? [], (string) $path) ?? '');
    }

    $expected = strtoupper(hash('sha256', $values . ($event['timestamp'] ?? '') . $secret));
    return hash_equals($expected, strtoupper((string) $checksum));
}
