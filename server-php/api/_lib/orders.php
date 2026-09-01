<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

function base64url_encode(string $data): string
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode(string $data): string
{
    $data = strtr($data, '-_', '+/');
    $remainder = strlen($data) % 4;
    if ($remainder > 0) {
        $data .= str_repeat('=', 4 - $remainder);
    }
    $decoded = base64_decode($data, true);
    return $decoded === false ? '' : $decoded;
}

function order_token_secret(): string
{
    $secret = inner_spirit_env('ORDER_TOKEN_SECRET');
    if (!$secret || str_starts_with($secret, 'change-me') || str_starts_with($secret, 'replace-with-')) {
        throw new RuntimeException('ORDER_TOKEN_SECRET no configurado');
    }
    return $secret;
}

function make_order_id(): string
{
    $ms = (string) (int) round(microtime(true) * 1000);
    $time = strtoupper(base_convert($ms, 10, 36));
    $random = strtoupper(bin2hex(random_bytes(4)));
    return "IS-{$time}-{$random}";
}

function sign_order(array $order): string
{
    $payload = base64url_encode(json_encode(
        ['orderId' => $order['orderId'], 'createdAt' => $order['createdAt']],
        JSON_UNESCAPED_UNICODE
    ));
    $signature = base64url_encode(hash_hmac('sha256', $payload, order_token_secret(), true));
    return "{$payload}.{$signature}";
}

function order_token_max_age_seconds(): int
{
    $days = (int) inner_spirit_env('ORDER_TOKEN_MAX_AGE_DAYS', '90');
    return ($days > 0 ? $days : 90) * 24 * 60 * 60;
}

function verify_order_token(string $token): array
{
    $parts = explode('.', $token);
    if (count($parts) !== 2 || $parts[0] === '' || $parts[1] === '') {
        throw new RuntimeException('Token invalido');
    }
    [$payload, $signature] = $parts;

    $expected = base64url_encode(hash_hmac('sha256', $payload, order_token_secret(), true));
    if (!hash_equals($expected, $signature)) {
        throw new RuntimeException('Firma invalida');
    }

    $decoded = json_decode(base64url_decode($payload), true);
    if (!is_array($decoded) || empty($decoded['orderId'])) {
        throw new RuntimeException('Token invalido');
    }

    $createdAt = (string) ($decoded['createdAt'] ?? '');
    $createdTs = strtotime($createdAt);
    if ($createdTs !== false && (time() - $createdTs) > order_token_max_age_seconds()) {
        throw new RuntimeException('Token expirado');
    }

    return ['orderId' => (string) $decoded['orderId'], 'createdAt' => $createdAt];
}

function iso8601_now(): string
{
    $microtime = microtime(true);
    $dt = DateTime::createFromFormat('U.u', sprintf('%.6f', $microtime), new DateTimeZone('UTC'));
    if ($dt === false) {
        return gmdate('Y-m-d\TH:i:s') . '.000Z';
    }
    return $dt->format('Y-m-d\TH:i:s.v\Z');
}

function create_order_snapshot(string $provider, array $customer, array $items, ?array $fulfillment = null): array
{
    $amount = 0;
    foreach ($items as $item) {
        $amount += $item['lineTotal'];
    }
    $order = [
        'orderId' => make_order_id(),
        'provider' => $provider,
        'currency' => 'COP',
        'amount' => $amount,
        'amountInCents' => $amount * 100,
        'customer' => $customer,
        'items' => $items,
        'createdAt' => iso8601_now(),
    ];
    if ($fulfillment) {
        $order['fulfillment'] = $fulfillment;
    }
    return $order;
}

function get_base_url(): string
{
    $configured = inner_spirit_env('PUBLIC_SITE_URL');
    if ($configured) {
        return rtrim($configured, '/');
    }
    // Sin PUBLIC_SITE_URL, derivar del Host permitiria que un cliente inyecte un
    // dominio propio en notification_url/back_urls de la preferencia de pago.
    throw new RuntimeException('PUBLIC_SITE_URL no configurado');
}
