<?php
declare(strict_types=1);

require_once __DIR__ . '/../_lib/config.php';
require_once __DIR__ . '/../_lib/db.php';
require_once __DIR__ . '/../_lib/orders.php';
require_once __DIR__ . '/../_lib/pdf.php';

function confirm_escape_html($value): string
{
    return htmlspecialchars((string) ($value ?? ''), ENT_QUOTES, 'UTF-8');
}

function confirm_html(string $body): string
{
    return <<<HTML
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Confirmacion Inner Spirit</title>
  <style>
    body{margin:0;font-family:Inter,Arial,sans-serif;background:#EAE0CC;color:#1A1A18}
    main{max-width:760px;margin:0 auto;padding:48px 20px}
    section{background:#FAF7F2;border:1px solid rgba(77,106,109,.18);padding:28px}
    h1{font-family:Georgia,serif;font-size:42px;line-height:1;margin:0 0 16px}
    a,button{display:inline-flex;min-height:44px;align-items:center;padding:0 18px;background:#4D6A6D;color:#EAE0CC;text-decoration:none;border:0}
    pre{white-space:pre-wrap;line-height:1.6}
  </style>
</head>
<body><main><section>{$body}</section></main></body></html>
HTML;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    header('Content-Type: text/html; charset=utf-8');
    http_response_code(405);
    echo 'Metodo no permitido';
    exit;
}

try {
    $token = (string) ($_GET['token'] ?? '');
    $tokenOrder = verify_order_token($token);
    $order = get_order_by_id($tokenOrder['orderId']);
    $meta = get_order_payment_meta($order['orderId']);
    $paid = $meta['status'] === 'paid';
    $failed = $meta['status'] === 'failed';
    $receipt = confirm_escape_html(implode("\n", build_receipt_text($order)));
    $tokenParam = urlencode($token);
    $pdfLink = $paid
        ? "<p><a href=\"/api/orders/pdf?token={$tokenParam}\">Abrir PDF / entrada</a></p>"
        : '<p>El PDF, las entradas y el email quedan disponibles cuando el webhook firmado confirme el pago.</p>';

    $title = $paid ? 'Pago recibido' : ($failed ? 'Pago no aprobado' : 'Pago pendiente');
    $body = "
      <p style=\"letter-spacing:.18em;text-transform:uppercase;color:#4D6A6D;font-weight:700\">Inner Spirit Studio</p>
      <h1>{$title}</h1>
      <p>Orden <strong>" . confirm_escape_html($order['orderId']) . "</strong></p>
      <pre>{$receipt}</pre>
      <p>Estado: " . confirm_escape_html($meta['status']) . "</p>
      {$pdfLink}
      <p><a href=\"/api/orders/confirm?token={$tokenParam}\">Actualizar estado</a></p>
      <p><a href=\"/\">Volver al sitio</a></p>
    ";

    header('Content-Type: text/html; charset=utf-8');
    echo confirm_html($body);
} catch (Throwable $e) {
    header('Content-Type: text/html; charset=utf-8');
    http_response_code(400);
    echo confirm_html('<h1>Error</h1><p>No pudimos validar esta orden.</p>');
}
