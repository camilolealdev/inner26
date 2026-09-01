<?php
declare(strict_types=1);

/**
 * COPIA este archivo a /home/<usuario_cpanel>/secure_config/config.php en el
 * servidor (fuera de public_html, para que Apache nunca lo sirva) y rellena
 * los valores reales. No subas este archivo con datos reales a git.
 */
return [
    // MySQL (cPanel > MySQL Databases)
    'DB_HOST' => 'localhost',
    'DB_NAME' => 'innerspi_inner',
    'DB_USER' => 'innerspi_inner',
    'DB_PASS' => 'replace-with-db-password',

    'PUBLIC_SITE_URL' => 'https://innerspirit.net',
    'ORDER_TOKEN_SECRET' => 'replace-with-long-random-order-token-secret',
    'ORDER_TOKEN_MAX_AGE_DAYS' => '90',

    // Mercado Pago Checkout Pro
    'MERCADOPAGO_ACCESS_TOKEN' => 'replace-with-mercadopago-access-token',
    'MERCADOPAGO_WEBHOOK_SECRET' => 'replace-with-mercadopago-webhook-secret',

    // Wompi Checkout Web
    'WOMPI_PUBLIC_KEY' => 'replace-with-wompi-public-key',
    'WOMPI_INTEGRITY_KEY' => 'replace-with-wompi-integrity-key',
    'WOMPI_EVENTS_SECRET' => 'replace-with-wompi-events-secret',
    'WOMPI_CHECKOUT_URL' => 'https://checkout.wompi.co/p/',

    // Email de confirmacion con PDF adjunto (PHPMailer)
    'SMTP_HOST' => '',
    'SMTP_PORT' => '587',
    'SMTP_SECURE' => 'false',
    'SMTP_USER' => '',
    'SMTP_PASS' => '',
    'SMTP_FROM' => 'Inner Spirit Studio <hola@innerspirit.co>',
    'STUDIO_NOTIFY_EMAIL' => 'hola@innerspirit.co',
];
