<?php
declare(strict_types=1);

require_once __DIR__ . '/_lib/config.php';
require_once __DIR__ . '/_lib/db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    echo json_encode(['error' => 'Metodo no permitido']);
    exit;
}

function leads_clean($value, int $max): string
{
    $value = is_scalar($value) ? (string) $value : '';
    return mb_substr(trim($value), 0, $max, 'UTF-8');
}

function leads_email_ok(string $email): bool
{
    return (bool) preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email);
}

try {
    $body = json_decode(file_get_contents('php://input'), true);
    $body = is_array($body) ? $body : [];

    if (leads_clean($body['honeypot'] ?? '', 200) !== '') {
        echo json_encode(['stored' => false]);
        exit;
    }

    $source = ($body['source'] ?? null) === 'newsletter' ? 'newsletter' : 'contact';
    $email = strtolower(leads_clean($body['email'] ?? '', 180));
    if (!leads_email_ok($email)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email invalido']);
        exit;
    }

    if (($body['consent'] ?? null) !== true) {
        http_response_code(400);
        echo json_encode(['error' => 'Consentimiento requerido']);
        exit;
    }

    $name = leads_clean($body['name'] ?? '', 120);
    if ($source === 'contact' && mb_strlen($name) < 2) {
        http_response_code(400);
        echo json_encode(['error' => 'Nombre requerido']);
        exit;
    }

    $lead = ['source' => $source, 'email' => $email, 'consent' => true];
    if ($name !== '') {
        $lead['name'] = $name;
    }
    if (!empty($body['phone'])) {
        $lead['phone'] = leads_clean($body['phone'], 40);
    }
    if (!empty($body['interest'])) {
        $lead['interest'] = leads_clean($body['interest'], 60);
    }
    if (!empty($body['message'])) {
        $lead['message'] = leads_clean($body['message'], 2000);
    }

    try {
        record_lead($lead);
        http_response_code(201);
        echo json_encode(['stored' => true]);
    } catch (Throwable $dbError) {
        http_response_code(200);
        echo json_encode(['stored' => false, 'reason' => $dbError->getMessage()]);
    }
} catch (Throwable $e) {
    http_response_code(400);
    echo json_encode(['error' => 'Solicitud invalida']);
}
