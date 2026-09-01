# Backend PHP para cPanel (innerspirit.net)

Reemplaza las funciones serverless de Vercel (`api/*.ts`) para correr nativo en
Apache + MySQL, sin Node.js. Puerto 1:1 de la lógica original — ver
`../api/` (TypeScript) si necesitas comparar comportamiento.

## Qué subir y a dónde

```
public_html/                  <- raíz del dominio en cPanel
  index.html, assets/, ...    <- contenido de dist/ (npm run build)
  .htaccess                   <- de public/.htaccess (se genera con el build)
  api/                        <- TODO el contenido de server-php/api/ (este folder)
```

`server-php/api/` se sube completo dentro de `public_html/api/`, junto al
`dist/` del frontend en la raíz de `public_html/`.

## 1. Secretos (fuera de public_html)

Copia `server-php/secure_config.example.php` a:

```
/home/innerspi/secure_config/config.php
```

(un directorio **hermano** de `public_html`, no accesible por Apache) y
rellena los valores reales: credenciales MySQL, `ORDER_TOKEN_SECRET`, llaves
de Mercado Pago/Wompi, SMTP. Crea la carpeta `secure_config` vía File Manager
si no existe.

## 2. Base de datos MySQL

En cPanel → "MySQL Databases":
1. Crea una base (ej. `innerspi_inner`).
2. Crea un usuario y asígnale todos los privilegios sobre esa base.
3. Anota host (normalmente `localhost`), nombre de base, usuario y contraseña
   en `secure_config/config.php`.

Las tablas (`orders`, `order_items`, `webhook_events`, `email_deliveries`,
`leads`) se crean automáticamente en el primer request (`ensure_commerce_schema`
/ `ensure_leads_schema`), no hace falta importar SQL a mano.

## 3. PHPMailer (para el email de confirmación con PDF adjunto)

No se usa Composer. Descarga el release estable desde el repo oficial
(github.com/PHPMailer/PHPMailer) y copia solo la carpeta `src/` a:

```
server-php/api/vendor/phpmailer/src/PHPMailer.php
server-php/api/vendor/phpmailer/src/SMTP.php
server-php/api/vendor/phpmailer/src/Exception.php
```

(3 archivos, sin autoloader — `email.php` los incluye directo con `require_once`).

## 4. PHP version

En "MultiPHP Manager", confirma que el dominio usa PHP 8.0 o superior.

## 5. Subir

Vía FTP o File Manager:
- `dist/` (build del frontend, `npm run build`) → contenido a `public_html/`
- `server-php/api/` (con `vendor/phpmailer/` ya poblado) → `public_html/api/`

## 6. Verificar

```bash
# Leads
curl -X POST https://innerspirit.net/api/leads \
  -H "Content-Type: application/json" \
  -d '{"source":"contact","email":"test@example.com","name":"Test","consent":true}'

# Checkout (Wompi, no requiere llamada saliente — bueno para probar primero)
curl -X POST https://innerspirit.net/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"provider":"wompi","customer":{"name":"Test User","email":"test@example.com"},"items":[{"id":"prod-1","type":"product","quantity":1}]}'

# Status (usa el token que devuelve /api/checkout)
curl "https://innerspirit.net/api/orders/status?token=<TOKEN>"
```

Revisa errores con el "Error Log" de cPanel si algo devuelve 500 (probablemente
config.php no encontrado, o credenciales DB incorrectas).

## Notas de paridad con el original (api/*.ts)

- `db.php`: mismo esquema, adaptado a MySQL (`JSON` en vez de `jsonb`,
  `AUTO_INCREMENT` en vez de `bigserial`). La lógica condicional de
  `recordEmailDelivery` (que en Postgres era un solo `ON CONFLICT ... WHERE`)
  se hace con `SELECT ... FOR UPDATE` + transacción explícita en PHP.
- `pdf.php`: el PDF se genera concatenando bytes a mano, igual que el
  original — no depende de dompdf/tcpdf.
- `payments.php`: Mercado Pago por cURL directo (sin SDK), Wompi solo cálculo
  de firma (sin llamada HTTP). Mismos algoritmos HMAC/SHA-256 que el original.
- `orders.php`: mismo esquema de firma de token (HMAC-SHA256 + base64url,
  TTL 90 días).
