# Rutas API (mapa frontend → Apache → PHP)

Fuente única de las reescrituras: `public/.htaccess` (se copia a la raíz de
`public_html/` con el despliegue). Todas las rutas se sirven en el mismo
origen (`https://innerspirit.net`), por eso el CSP usa `connect-src 'self'`.

## Mapa de endpoints

| Método | Ruta pública (frontend) | Reescritura (RewriteRule) | Script PHP | Propósito |
|---|---|---|---|---|
| POST | `/api/leads` | `^api/(checkout\|leads)/?$` → `api/$1.php` | `api/leads.php` | Formulario de contacto / newsletter (requiere `consent: true`, honeypot anti-spam) |
| POST | `/api/checkout` | ídem | `api/checkout.php` | Crear orden + URL de pago (Mercado Pago Checkout Pro o Wompi Checkout Web), con `Idempotency-Key` |
| GET | `/api/orders/confirm` | `^api/orders/(confirm\|pdf\|status)/?$` → `api/orders/$1.php` | `api/orders/confirm.php` | Retorno del proveedor de pago: verifica estado, marca `paid`, dispara email con PDF y redirige al gracias |
| GET | `/api/orders/status?token=<TOKEN>` | ídem | `api/orders/status.php` | Estado de la orden (polling del frontend con token HMAC firmado, TTL 90 días) |
| GET | `/api/orders/pdf?...` | ídem | `api/orders/pdf.php` | PDF de la orden (bytes concatenados a mano, sin librerías) |
| POST | `/api/webhooks/mercadopago` | `^api/webhooks/(mercadopago\|wompi)/?$` → `api/webhooks/$1.php` | `api/webhooks/mercadopago.php` | Webhook de Mercado Pago (valida firma HMAC, dedupe en `webhook_events`) |
| POST | `/api/webhooks/wompi` | ídem | `api/webhooks/wompi.php` | Webhook de Wompi (valida firma de eventos, dedupe en `webhook_events`) |

## Reglas activas en `.htaccess`

```apache
RewriteRule ^api/orders/(confirm|pdf|status)/?$  api/orders/$1.php [L,QSA]
RewriteRule ^api/webhooks/(mercadopago|wompi)/?$ api/webhooks/$1.php [L,QSA]
RewriteRule ^api/(checkout|leads)/?$             api/$1.php [L,QSA]
```

Estas reglas van **antes** del catch-all SPA (cualquier ruta que no sea archivo
real devuelve `index.html` para el router del frontend).

## Convenciones compartidas

- Respuestas JSON UTF-8 (`Content-Type: application/json; charset=utf-8`).
- Método incorrecto → `405` con header `Allow` correcto.
- Errores de validación → `400` con `{"error": "..."}`.
- Montos en **centavos COP** (`amount_in_cents`), moneda fija `COP`.
- Secretos leídos de `/home/innerspi/secure_config/config.php`
  (nunca dentro de `public_html`).
- Paridad 1:1 con el backend Vercel (`api/*.ts` en Node) — mismo contrato de
  request/response, mismos algoritmos HMAC-SHA256.

## Verificación rápida (curl)

```bash
# Leads (POST)
curl -X POST https://innerspirit.net/api/leads \
  -H "Content-Type: application/json" \
  -d '{"source":"contact","email":"test@example.com","name":"Test","consent":true}'

# Checkout (POST, Wompi — no requiere llamada saliente)
curl -X POST https://innerspirit.net/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"provider":"wompi","customer":{"name":"Test User","email":"test@example.com"},"items":[{"id":"prod-1","type":"product","quantity":1}]}'

# Status (GET, con el token devuelto por checkout)
curl "https://innerspirit.net/api/orders/status?token=<TOKEN>"
```
