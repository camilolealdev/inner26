<?php
declare(strict_types=1);

require_once __DIR__ . '/_lib/admin_auth.php';
require_once __DIR__ . '/../_lib/config.php';

header('X-Robots-Tag: noindex, nofollow');

admin_session_start();

// Ya autenticado: directo al dashboard.
if (($_SESSION['admin_authed'] ?? null) === true) {
    header('Location: dashboard.php');
    exit;
}

/**
 * Valida que el destino post-login sea una ruta segura dentro de este
 * mismo directorio admin (server-php/api/admin/). Acepta rutas relativas
 * ("dashboard.php?status=paid") o absolutas que caigan bajo /api/admin/
 * (asi es como llega admin_require_login() via REQUEST_URI). Rechaza
 * cualquier esquema, host externo o "//" (protocol-relative) para evitar
 * open redirect.
 */
function admin_safe_next_path(string $next): string
{
    if ($next === '') {
        return 'dashboard.php';
    }
    if (str_starts_with($next, '//')) {
        return 'dashboard.php';
    }
    if (preg_match('#^[a-zA-Z][a-zA-Z0-9+.\-]*:#', $next) === 1) {
        // Tiene esquema (http:, https:, javascript:, etc.) -> rechazar.
        return 'dashboard.php';
    }
    if (str_contains($next, '..') || str_contains($next, '\\')) {
        return 'dashboard.php';
    }
    if (preg_match('#^[a-zA-Z0-9_\-./?=&]+$#', $next) !== 1) {
        return 'dashboard.php';
    }
    if (str_starts_with($next, '/')) {
        // Ruta absoluta: solo permitida si cae dentro de /api/admin/.
        return str_starts_with($next, '/api/admin/') ? $next : 'dashboard.php';
    }
    return $next;
}

$error = null;
$rawNext = (string) ($_GET['next'] ?? '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $submittedCsrf = (string) ($_POST['csrf_token'] ?? '');

    if (!admin_csrf_check($submittedCsrf)) {
        http_response_code(403);
        $error = 'Token de seguridad invalido. Recarga la pagina e intenta de nuevo.';
    } elseif (admin_too_many_attempts()) {
        http_response_code(429);
        $error = 'Demasiados intentos fallidos. Intenta de nuevo en unos minutos.';
    } else {
        $password = (string) ($_POST['password'] ?? '');

        $hash = null;
        $configBroken = false;
        try {
            $hash = inner_spirit_env('ADMIN_PASSWORD_HASH');
        } catch (Throwable $e) {
            $configBroken = true;
        }

        if ($configBroken || !$hash || $hash === 'replace-with-password-hash') {
            http_response_code(500);
            $error = 'El panel de administracion no esta configurado todavia. Contacta al desarrollador.';
        } elseif ($password !== '' && password_verify($password, $hash)) {
            session_regenerate_id(true);
            $_SESSION['admin_authed'] = true;
            admin_clear_login_attempts();
            $destination = admin_safe_next_path($rawNext);
            header('Location: ' . $destination);
            exit;
        } else {
            admin_record_failed_attempt();
            $error = 'Contrasena incorrecta.';
        }
    }
}

$csrfToken = admin_csrf_token();
$actionUrl = 'login.php' . ($rawNext !== '' ? ('?next=' . rawurlencode($rawNext)) : '');
$e = static fn($v) => htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Acceso administracion - Inner Spirit Studio</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f3ff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1f2937;
    padding: 16px;
  }
  .card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(31, 41, 55, 0.12);
    padding: 32px 28px;
    max-width: 360px;
    width: 100%;
  }
  h1 {
    margin: 0 0 4px;
    font-size: 1.25rem;
  }
  p.subtitle {
    margin: 0 0 20px;
    font-size: 0.9rem;
    color: #6b7280;
  }
  label {
    display: block;
    font-size: 0.85rem;
    margin-bottom: 6px;
    color: #374151;
  }
  input[type="password"] {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    margin-bottom: 16px;
  }
  button {
    width: 100%;
    padding: 11px 12px;
    background: #6d28d9;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
  button:hover { background: #5b21b6; }
  .error {
    background: #fee2e2;
    color: #b91c1c;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 0.85rem;
    margin-bottom: 16px;
  }
</style>
</head>
<body>
  <div class="card">
    <h1>Inner Spirit Studio</h1>
    <p class="subtitle">Panel de administracion</p>
    <?php if ($error !== null): ?>
      <div class="error"><?= $e($error) ?></div>
    <?php endif; ?>
    <form method="post" action="<?= $e($actionUrl) ?>">
      <input type="hidden" name="csrf_token" value="<?= $e($csrfToken) ?>">
      <label for="password">Contrasena</label>
      <input type="password" id="password" name="password" autocomplete="current-password" autofocus required>
      <button type="submit">Entrar</button>
    </form>
  </div>
</body>
</html>
