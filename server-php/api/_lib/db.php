<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

function inner_spirit_pdo(): PDO
{
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $host = inner_spirit_env('DB_HOST', 'localhost');
    $name = inner_spirit_env('DB_NAME');
    $user = inner_spirit_env('DB_USER');
    $pass = inner_spirit_env('DB_PASS', '');

    if (!$name || !$user) {
        throw new RuntimeException('DB_NAME/DB_USER no configurados');
    }

    $dsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    // created_at/updated_at usan CURRENT_TIMESTAMP; forzamos UTC para que
    // coincida con las fechas ISO que espera el frontend.
    $pdo->exec("SET time_zone = '+00:00'");

    return $pdo;
}

function ensure_commerce_schema(): void
{
    static $done = false;
    if ($done) {
        return;
    }
    $pdo = inner_spirit_pdo();

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS orders (
            id VARCHAR(64) PRIMARY KEY,
            status VARCHAR(32) NOT NULL DEFAULT 'pending_payment',
            provider VARCHAR(32) NOT NULL,
            provider_reference VARCHAR(191) UNIQUE,
            currency VARCHAR(8) NOT NULL DEFAULT 'COP',
            subtotal_amount INT NOT NULL,
            total_amount INT NOT NULL,
            amount_in_cents BIGINT NOT NULL,
            customer_name VARCHAR(191) NOT NULL,
            customer_email VARCHAR(191) NOT NULL,
            customer_phone VARCHAR(64),
            fulfillment_type VARCHAR(16),
            delivery_address VARCHAR(240),
            idempotency_key VARCHAR(191) NOT NULL UNIQUE,
            payload_hash CHAR(64) NOT NULL,
            order_token TEXT NOT NULL,
            checkout_url TEXT,
            paid_at DATETIME NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS order_items (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            order_id VARCHAR(64) NOT NULL,
            item_id VARCHAR(191) NOT NULL,
            item_type VARCHAR(16) NOT NULL,
            title VARCHAR(191) NOT NULL,
            details TEXT,
            unit_amount INT NOT NULL,
            quantity INT NOT NULL,
            line_total INT NOT NULL,
            illustration_name VARCHAR(191),
            CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS webhook_events (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            provider VARCHAR(32) NOT NULL,
            event_id VARCHAR(191) NOT NULL,
            payload JSON NOT NULL,
            processed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY uniq_provider_event (provider, event_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS email_deliveries (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            order_id VARCHAR(64) NOT NULL,
            delivery_type VARCHAR(32) NOT NULL,
            status VARCHAR(16) NOT NULL,
            message TEXT,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY uniq_order_delivery (order_id, delivery_type),
            CONSTRAINT fk_email_deliveries_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    $done = true;
}

function ensure_leads_schema(): void
{
    static $done = false;
    if ($done) {
        return;
    }
    $pdo = inner_spirit_pdo();
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS leads (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            source VARCHAR(32) NOT NULL,
            name VARCHAR(191),
            email VARCHAR(191) NOT NULL,
            phone VARCHAR(64),
            interest VARCHAR(120),
            message TEXT,
            consent TINYINT(1) NOT NULL DEFAULT 0,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");
    $done = true;
}

function hash_payload($value): string
{
    return hash('sha256', json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

function map_order(array $row, array $items): array
{
    $order = [
        'orderId' => $row['id'],
        'provider' => $row['provider'],
        'currency' => $row['currency'],
        'amount' => (int) $row['total_amount'],
        'amountInCents' => (int) $row['amount_in_cents'],
        'customer' => array_filter([
            'name' => $row['customer_name'],
            'email' => $row['customer_email'],
            'phone' => $row['customer_phone'] !== null && $row['customer_phone'] !== '' ? $row['customer_phone'] : null,
        ], static fn($v) => $v !== null),
        'items' => $items,
        'createdAt' => gmdate('Y-m-d\TH:i:s', strtotime($row['created_at'] . ' UTC')) . '.000Z',
    ];

    if ($row['fulfillment_type'] === 'pickup' || $row['fulfillment_type'] === 'delivery') {
        $order['fulfillment'] = array_filter([
            'type' => $row['fulfillment_type'],
            'address' => $row['delivery_address'] !== null && $row['delivery_address'] !== '' ? $row['delivery_address'] : null,
        ], static fn($v) => $v !== null);
    }

    return $order;
}

function map_item(array $row): array
{
    $item = [
        'id' => $row['item_id'],
        'name' => $row['title'],
        'type' => $row['item_type'],
        'quantity' => (int) $row['quantity'],
        'price' => (int) $row['unit_amount'],
        'unitPrice' => (int) $row['unit_amount'],
        'lineTotal' => (int) $row['line_total'],
    ];
    if (!empty($row['details'])) {
        $item['details'] = $row['details'];
    }
    if (!empty($row['illustration_name'])) {
        $item['illustrationName'] = $row['illustration_name'];
    }
    return $item;
}

function create_order_record(array $order, string $token, string $idempotencyKey, string $payloadHash): array
{
    ensure_commerce_schema();
    $pdo = inner_spirit_pdo();

    $stmt = $pdo->prepare('SELECT id, payload_hash FROM orders WHERE idempotency_key = ?');
    $stmt->execute([$idempotencyKey]);
    $existing = $stmt->fetch();
    if ($existing) {
        if ($existing['payload_hash'] !== $payloadHash) {
            throw new RuntimeException('Idempotency-Key reutilizada con payload distinto');
        }
        return get_order_by_id($existing['id']);
    }

    $pdo->beginTransaction();
    try {
        $insertOrder = $pdo->prepare('
            INSERT INTO orders (
                id, status, provider, currency, subtotal_amount, total_amount, amount_in_cents,
                customer_name, customer_email, customer_phone, fulfillment_type, delivery_address,
                idempotency_key, payload_hash, order_token
            ) VALUES (?, "pending_payment", ?, "COP", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ');
        $insertOrder->execute([
            $order['orderId'],
            $order['provider'],
            $order['amount'],
            $order['amount'],
            $order['amountInCents'],
            $order['customer']['name'],
            $order['customer']['email'],
            $order['customer']['phone'] ?? null,
            $order['fulfillment']['type'] ?? null,
            $order['fulfillment']['address'] ?? null,
            $idempotencyKey,
            $payloadHash,
            $token,
        ]);

        $insertItem = $pdo->prepare('
            INSERT INTO order_items (
                order_id, item_id, item_type, title, details, unit_amount, quantity, line_total, illustration_name
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ');
        foreach ($order['items'] as $item) {
            $insertItem->execute([
                $order['orderId'],
                $item['id'],
                $item['type'],
                $item['name'],
                $item['details'] ?? null,
                $item['unitPrice'],
                $item['quantity'],
                $item['lineTotal'],
                $item['illustrationName'] ?? null,
            ]);
        }

        $pdo->commit();
        return $order;
    } catch (PDOException $e) {
        $pdo->rollBack();
        if ((int) ($e->errorInfo[1] ?? 0) === 1062) {
            $stmt = $pdo->prepare('SELECT id, payload_hash FROM orders WHERE idempotency_key = ?');
            $stmt->execute([$idempotencyKey]);
            $row = $stmt->fetch();
            if ($row && $row['payload_hash'] === $payloadHash) {
                return get_order_by_id($row['id']);
            }
        }
        throw $e;
    }
}

function get_order_by_id(string $orderId): array
{
    ensure_commerce_schema();
    $pdo = inner_spirit_pdo();
    $stmt = $pdo->prepare('SELECT * FROM orders WHERE id = ?');
    $stmt->execute([$orderId]);
    $orderRow = $stmt->fetch();
    if (!$orderRow) {
        throw new RuntimeException('Orden no encontrada');
    }

    $itemsStmt = $pdo->prepare('SELECT * FROM order_items WHERE order_id = ? ORDER BY id');
    $itemsStmt->execute([$orderId]);
    $items = array_map('map_item', $itemsStmt->fetchAll());

    return map_order($orderRow, $items);
}

function get_order_token(string $orderId): string
{
    ensure_commerce_schema();
    $pdo = inner_spirit_pdo();
    $stmt = $pdo->prepare('SELECT order_token FROM orders WHERE id = ?');
    $stmt->execute([$orderId]);
    $row = $stmt->fetch();
    if (!$row) {
        throw new RuntimeException('Orden no encontrada');
    }
    return (string) $row['order_token'];
}

function get_order_payment_meta(string $orderId): array
{
    ensure_commerce_schema();
    $pdo = inner_spirit_pdo();
    $stmt = $pdo->prepare('SELECT status, provider, provider_reference, checkout_url FROM orders WHERE id = ?');
    $stmt->execute([$orderId]);
    $row = $stmt->fetch();
    if (!$row) {
        throw new RuntimeException('Orden no encontrada');
    }
    return array_filter([
        'status' => (string) $row['status'],
        'provider' => (string) $row['provider'],
        'providerReference' => $row['provider_reference'] ? (string) $row['provider_reference'] : null,
        'checkoutUrl' => $row['checkout_url'] ? (string) $row['checkout_url'] : null,
    ], static fn($v) => $v !== null);
}

function attach_checkout_to_order(string $orderId, string $providerReference, string $checkoutUrl): void
{
    ensure_commerce_schema();
    $pdo = inner_spirit_pdo();
    $stmt = $pdo->prepare('UPDATE orders SET provider_reference = ?, checkout_url = ?, updated_at = UTC_TIMESTAMP() WHERE id = ?');
    $stmt->execute([$providerReference, $checkoutUrl, $orderId]);
}

function mark_order_status(string $orderId, string $status, ?string $providerReference = null): void
{
    ensure_commerce_schema();
    $pdo = inner_spirit_pdo();
    $stmt = $pdo->prepare('
        UPDATE orders
        SET status = CASE WHEN status = "paid" AND ? <> "paid" THEN status ELSE ? END,
            provider_reference = CASE WHEN status = "paid" AND ? <> "paid" THEN provider_reference ELSE COALESCE(?, provider_reference) END,
            paid_at = CASE WHEN ? = "paid" AND paid_at IS NULL THEN UTC_TIMESTAMP() ELSE paid_at END,
            updated_at = UTC_TIMESTAMP()
        WHERE id = ?
    ');
    $stmt->execute([$status, $status, $status, $providerReference, $status, $orderId]);
}

function record_webhook_event(string $provider, string $eventId, $payload): bool
{
    ensure_commerce_schema();
    $pdo = inner_spirit_pdo();
    $stmt = $pdo->prepare('INSERT IGNORE INTO webhook_events (provider, event_id, payload) VALUES (?, ?, ?)');
    $stmt->execute([$provider, $eventId, json_encode($payload, JSON_UNESCAPED_UNICODE)]);
    return $stmt->rowCount() > 0;
}

/**
 * Puerto de recordEmailDelivery (db.ts): el original usa un UPSERT condicional
 * de una sola sentencia (ON CONFLICT ... WHERE). MySQL no soporta esa condicion
 * en ON DUPLICATE KEY UPDATE, asi que se replica con SELECT ... FOR UPDATE +
 * decision en PHP dentro de una transaccion, preservando el mismo resultado.
 */
function record_email_delivery(string $orderId, string $deliveryType, string $status, ?string $message = null): bool
{
    ensure_commerce_schema();
    $pdo = inner_spirit_pdo();
    $pdo->beginTransaction();
    try {
        $stmt = $pdo->prepare('SELECT id, status, created_at FROM email_deliveries WHERE order_id = ? AND delivery_type = ? FOR UPDATE');
        $stmt->execute([$orderId, $deliveryType]);
        $existing = $stmt->fetch();

        if (!$existing) {
            $insert = $pdo->prepare('INSERT INTO email_deliveries (order_id, delivery_type, status, message) VALUES (?, ?, ?, ?)');
            $insert->execute([$orderId, $deliveryType, $status, $message]);
            $pdo->commit();
            return true;
        }

        $isStale = $existing['status'] === 'processing'
            && strtotime($existing['created_at'] . ' UTC') < (time() - 600);
        $canOverwrite = in_array($existing['status'], ['failed', 'skipped'], true) || $isStale;

        if (!$canOverwrite) {
            $pdo->commit();
            return false;
        }

        $update = $pdo->prepare('UPDATE email_deliveries SET status = ?, message = ?, created_at = UTC_TIMESTAMP() WHERE id = ?');
        $update->execute([$status, $message, $existing['id']]);
        $pdo->commit();
        return true;
    } catch (Throwable $e) {
        $pdo->rollBack();
        throw $e;
    }
}

function update_email_delivery(string $orderId, string $deliveryType, string $status, ?string $message = null): void
{
    ensure_commerce_schema();
    $pdo = inner_spirit_pdo();
    $stmt = $pdo->prepare('UPDATE email_deliveries SET status = ?, message = ?, created_at = UTC_TIMESTAMP() WHERE order_id = ? AND delivery_type = ?');
    $stmt->execute([$status, $message, $orderId, $deliveryType]);
}

function record_lead(array $lead): void
{
    ensure_leads_schema();
    $pdo = inner_spirit_pdo();
    $stmt = $pdo->prepare('INSERT INTO leads (source, name, email, phone, interest, message, consent) VALUES (?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([
        $lead['source'],
        $lead['name'] ?? null,
        $lead['email'],
        $lead['phone'] ?? null,
        $lead['interest'] ?? null,
        $lead['message'] ?? null,
        !empty($lead['consent']) ? 1 : 0,
    ]);
}
