<?php
declare(strict_types=1);

/**
 * Script de auto-verificacion TEMPORAL: sube este archivo a public_html/,
 * visitalo una vez en el navegador, compara el JSON contra los valores de
 * referencia (generados en Node con el mismo secreto de prueba) y BORRALO
 * del servidor despues de confirmar que coinciden. No usa la base de datos
 * ni ningun secreto real -- solo prueba que las funciones de hash/firma
 * producen el mismo resultado que el codigo Node original.
 *
 * Valores esperados (calculados con Node crypto, secret = "test-secret-123"):
 *   order_token_payload:          eyJvcmRlcklkIjoiSVMtVEVTVC1BQkNEMTIzNCIsImNyZWF0ZWRBdCI6IjIwMjYtMDEtMDFUMDA6MDA6MDAuMDAwWiJ9
 *   order_token_signature:        LPlT8Z1rkeN3WSZ8SUOXLRaZgqTL6y3zYNFJgV8Y4_Y
 *   wompi_integrity_signature:    ebc4b5faafeb97ba29a6bde226a75b0d6b507056b57e67f4210a0f61b486b564
 *   mercadopago_webhook_signature: ab2ab37c23211915d3c1a33e1063da61f5e8064bcfea855901125b5bc55a6e45
 *   wompi_event_checksum:         7E1DA7D34F4525088443DE485B5F85CADD26479254FB32B5C6E256B88437AE7C
 */

function v_base64url_encode(string $data): string
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

$secret = 'test-secret-123';

// 1. Order token signing
$payload = v_base64url_encode(json_encode(
    ['orderId' => 'IS-TEST-ABCD1234', 'createdAt' => '2026-01-01T00:00:00.000Z'],
    JSON_UNESCAPED_UNICODE
));
$tokenSig = v_base64url_encode(hash_hmac('sha256', $payload, $secret, true));

// 2. Wompi integrity signature
$wompiSig = hash('sha256', 'IS-TEST-ABCD1234' . '4500000' . 'COP' . $secret);

// 3. MercadoPago webhook manifest HMAC
$manifest = 'id:123456;request-id:req-abc;ts:1700000000;';
$mpSig = hash_hmac('sha256', $manifest, $secret);

// 4. Wompi event checksum
$wompiEventSig = strtoupper(hash('sha256', 'APPROVED' . '4500000' . 'tx-999' . '1700000000' . $secret));

header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    'order_token_payload' => $payload,
    'order_token_signature' => $tokenSig,
    'wompi_integrity_signature' => $wompiSig,
    'mercadopago_webhook_signature' => $mpSig,
    'wompi_event_checksum' => $wompiEventSig,
], JSON_PRETTY_PRINT);
