<?php
declare(strict_types=1);

const PRODUCT_CATALOG = [
    'prod-1' => ['name' => 'Cristal de Cuarzo', 'price' => 45000],
    'prod-2' => ['name' => 'Incienso Natural', 'price' => 22000],
    'prod-3' => ['name' => 'Aceite Esencial', 'price' => 35000],
    'prod-4' => ['name' => 'Diario de Gratitud', 'price' => 65000],
    'prod-5' => ['name' => 'Vela de Soja', 'price' => 48000],
    'prod-6' => ['name' => 'Manta de Lino', 'price' => 120000],
    'prod-7' => ['name' => 'Cuenco Tibetano', 'price' => 160000],
    'prod-8' => ['name' => 'Palo Santo', 'price' => 28000],
];

function normalize_service_name(string $value): string
{
    $value = str_replace(
        ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ'],
        ['a', 'e', 'i', 'o', 'u', 'n', 'A', 'E', 'I', 'O', 'U', 'N'],
        $value
    );
    $value = mb_strtoupper(trim($value), 'UTF-8');
    $value = preg_replace('/\s+/', ' ', $value);
    return trim($value);
}

function service_catalog_entries(): array
{
    static $normalized = null;
    if ($normalized !== null) {
        return $normalized;
    }

    $entries = [
        'Yoga' => ['name' => 'Yoga', 'price' => 36000],
        'Clase de Yoga' => ['name' => 'Yoga', 'price' => 36000],
        'Yoga Flow' => ['name' => 'Yoga Flow', 'price' => 36000],
        'Meditacion' => ['name' => 'Meditacion', 'price' => 36000],
        'Meditacion & Breathwork' => ['name' => 'Meditacion & Breathwork', 'price' => 36000],
        'Breathwork' => ['name' => 'Breathwork', 'price' => 36000],
        'Danza & Movimiento' => ['name' => 'Danza & Movimiento', 'price' => 36000],
        'Danza & Sound Healing' => ['name' => 'Danza & Sound Healing', 'price' => 36000],
        'Sound Healing' => ['name' => 'Sound Healing', 'price' => 36000],
        'Inner Dance' => ['name' => 'INNER DANCE', 'price' => 55000],
        'Rocket Yoga' => ['name' => 'ROCKET YOGA', 'price' => 95000],
        'Circulo Luna Llena' => ['name' => 'CIRCULO LUNA LLENA', 'price' => 44000],
    ];

    $normalized = [];
    foreach ($entries as $key => $value) {
        $normalized[normalize_service_name($key)] = $value;
    }
    return $normalized;
}

function clean_text($value, int $max = 180): string
{
    $value = is_scalar($value) ? (string) $value : '';
    return mb_substr(trim($value), 0, $max, 'UTF-8');
}

function normalize_checkout_items($items): array
{
    if (!is_array($items) || count($items) === 0) {
        throw new RuntimeException('Carrito vacio');
    }

    $items = array_slice($items, 0, 20);
    $serviceCatalog = service_catalog_entries();
    $normalized = [];

    foreach ($items as $raw) {
        if (!is_array($raw)) {
            throw new RuntimeException('Tipo de item invalido');
        }
        $type = $raw['type'] ?? null;
        if (!in_array($type, ['product', 'class', 'event'], true)) {
            throw new RuntimeException('Tipo de item invalido');
        }

        $id = clean_text($raw['id'] ?? '');
        $quantity = (int) min(max((float) ($raw['quantity'] ?? 1), 1), 10);
        $name = clean_text($raw['name'] ?? '');
        $unitPrice = (float) ($raw['price'] ?? 0);

        if ($type === 'product') {
            $canonical = PRODUCT_CATALOG[$id] ?? null;
            if (!$canonical) {
                throw new RuntimeException("Producto no permitido: {$id}");
            }
            $name = $canonical['name'];
            $unitPrice = $canonical['price'];
        } else {
            $canonical = $serviceCatalog[normalize_service_name($name)] ?? null;
            if (!$canonical) {
                throw new RuntimeException("Reserva no permitida: {$name}");
            }
            $name = $canonical['name'];
            $unitPrice = $canonical['price'];
        }

        if (!is_finite($unitPrice) || $unitPrice <= 0) {
            throw new RuntimeException('Precio invalido');
        }

        $item = [
            'id' => $id,
            'name' => $name,
            'type' => $type,
            'quantity' => $quantity,
            'price' => $unitPrice,
            'unitPrice' => $unitPrice,
            'lineTotal' => $unitPrice * $quantity,
        ];
        if (!empty($raw['details'])) {
            $item['details'] = clean_text($raw['details']);
        }
        if (!empty($raw['illustrationName'])) {
            $item['illustrationName'] = clean_text($raw['illustrationName']);
        }
        $normalized[] = $item;
    }

    return $normalized;
}
