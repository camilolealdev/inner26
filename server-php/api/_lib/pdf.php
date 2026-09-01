<?php
declare(strict_types=1);

function pdf_ascii(string $value): string
{
    $value = str_replace(
        ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ'],
        ['a', 'e', 'i', 'o', 'u', 'n', 'A', 'E', 'I', 'O', 'U', 'N'],
        $value
    );
    return preg_replace('/[^\x20-\x7E]/', '', $value);
}

function pdf_escape(string $value): string
{
    $value = pdf_ascii($value);
    $value = str_replace('\\', '\\\\', $value);
    $value = str_replace('(', '\\(', $value);
    $value = str_replace(')', '\\)', $value);
    return $value;
}

function build_receipt_text(array $order): array
{
    $lines = [
        'INNER SPIRIT STUDIO',
        "Orden: {$order['orderId']}",
        "Cliente: {$order['customer']['name']}",
        "Email: {$order['customer']['email']}",
        'Total: $' . number_format((float) $order['amount'], 0, ',', '.') . ' COP',
    ];

    if (!empty($order['fulfillment'])) {
        $lines[] = 'Entrega: ' . (($order['fulfillment']['type'] ?? '') === 'delivery' ? 'Envio' : 'Retiro en estudio');
        if (!empty($order['fulfillment']['address'])) {
            $lines[] = "Direccion: {$order['fulfillment']['address']}";
        }
    }

    $lines[] = '';
    $lines[] = 'Items:';
    foreach ($order['items'] as $item) {
        $kind = $item['type'] === 'product' ? 'Articulo' : 'Entrada';
        $details = !empty($item['details']) ? " - {$item['details']}" : '';
        $lines[] = "{$kind}: {$item['name']} x{$item['quantity']}{$details}";
    }

    $lines[] = '';
    $lines[] = 'Presenta este comprobante al llegar al estudio.';
    $lines[] = 'Transversal 1 #17-29, La Candelaria, Bogota.';

    return $lines;
}

/**
 * Genera un PDF de una sola pagina concatenando objetos PDF crudos a mano,
 * igual que api/_lib/pdf.ts -- no depende de ninguna libreria (dompdf/tcpdf).
 */
function build_order_pdf(array $order): string
{
    $lines = build_receipt_text($order);
    $textParts = [];
    foreach ($lines as $index => $line) {
        $y = 760 - $index * 18;
        $textParts[] = "BT /F1 12 Tf 50 {$y} Td (" . pdf_escape($line) . ') Tj ET';
    }
    $text = implode("\n", $textParts);

    $objects = [
        '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
        '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
        '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj',
        '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
        '5 0 obj << /Length ' . strlen($text) . " >> stream\n{$text}\nendstream endobj",
    ];

    $pdf = "%PDF-1.4\n";
    $offsets = [0];
    foreach ($objects as $object) {
        $offsets[] = strlen($pdf);
        $pdf .= "{$object}\n";
    }

    $xrefOffset = strlen($pdf);
    $pdf .= "xref\n0 " . (count($objects) + 1) . "\n0000000000 65535 f \n";
    for ($i = 1; $i <= count($objects); $i++) {
        $pdf .= str_pad((string) $offsets[$i], 10, '0', STR_PAD_LEFT) . " 00000 n \n";
    }
    $pdf .= 'trailer << /Size ' . (count($objects) + 1) . " /Root 1 0 R >>\nstartxref\n{$xrefOffset}\n%%EOF";

    return $pdf;
}
