-- Inner Spirit — estructura MySQL (cPanel, MySQL 5.7+/MariaDB 10.3+)
-- Espejo 1:1 del DDL auto-generado en server-php/api/_lib/db.php
-- (ensure_commerce_schema / ensure_leads_schema). Si importas este archivo,
-- el backend no volverá a crear las tablas (usa CREATE TABLE IF NOT EXISTS).
--
-- ⚠ En cPanel NO se puede hacer CREATE DATABASE por SQL: la base y el usuario
--   se crean desde cPanel → "MySQL® Databases" (el panel antepone el prefijo
--   del usuario, ej. usuario "innerspi" + base "inner" => "innerspi_inner").
--   Pasos:
--   1. cPanel → MySQL® Databases → "Create a New Database" (ej. innerspi_inner)
--   2. "Add New User" (ej. innerspi_inner) y anota la contraseña
--   3. "Add User To Database" → marcar ALL PRIVILEGES
--   4. Anota host (normalmente localhost) + base + usuario + contraseña en
--      /home/innerspi/secure_config/config.php (DB_HOST/DB_NAME/DB_USER/DB_PASS)
--   5. Importa este archivo desde phpMyAdmin (selecciona la base → Importar)
--
-- Alternativa: no importes nada — las tablas se crean solas en el primer
-- request contra /api/checkout o /api/leads. Este archivo existe para poder
-- crearlas/verificarlas a mano desde phpMyAdmin.
--
-- Charset/UTC: el backend fuerza SET time_zone = '+00:00' por conexión y
-- created_at/updated_at usan CURRENT_TIMESTAMP (UTC del servidor MySQL).

-- ---------------------------------------------------------------------------
-- Órdenes (checkout, confirmación de pago, tokens, webhooks)
-- ---------------------------------------------------------------------------
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Líneas de cada orden (productos/ilustraciones comprados)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Deduplicación de eventos de webhook (idempotencia por provider+event_id)
CREATE TABLE IF NOT EXISTS webhook_events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    provider VARCHAR(32) NOT NULL,
    event_id VARCHAR(191) NOT NULL,
    payload JSON NOT NULL,
    processed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_provider_event (provider, event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Registro de emails de confirmación enviados (uno por orden+tipo, con
-- reintentos controlados desde record_email_delivery en db.php)
CREATE TABLE IF NOT EXISTS email_deliveries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(64) NOT NULL,
    delivery_type VARCHAR(32) NOT NULL,
    status VARCHAR(16) NOT NULL,
    message TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_order_delivery (order_id, delivery_type),
    CONSTRAINT fk_email_deliveries_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Leads del formulario de contacto / newsletter
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Verificación rápida (phpMyAdmin → SQL):
--   SHOW TABLES;             -> 5 tablas: orders, order_items, webhook_events, email_deliveries, leads
--   SHOW CREATE TABLE orders; -> debe coincidir con este archivo
