<?php
declare(strict_types=1);

/**
 * Helpers de autenticacion para el dashboard de administracion
 * (server-php/api/admin/). Password unica compartida (sin usuarios
 * multiples), sesion de PHP con cookie segura, CSRF y throttle simple
 * de intentos fallidos guardado en la sesion.
 */

const ADMIN_LOGIN_MAX_ATTEMPTS = 5;
const ADMIN_LOGIN_WINDOW_SECONDS = 900; // 15 minutos

/**
 * Inicia (o retoma) la sesion de PHP con parametros de cookie seguros.
 * Debe llamarse antes de leer/escribir $_SESSION en cualquier pagina del
 * admin. session_set_cookie_params() se llama ANTES de session_start(),
 * como exige PHP para que los parametros surtan efecto.
 */
function admin_session_start(): void
{
    static $started = false;
    if ($started || session_status() === PHP_SESSION_ACTIVE) {
        $started = true;
        return;
    }

    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => '',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);

    session_start();
    $started = true;
}

/**
 * Exige una sesion autenticada. Si no lo esta, redirige (302) a
 * login.php?next=<ruta actual> y termina la ejecucion.
 */
function admin_require_login(): void
{
    admin_session_start();

    if (($_SESSION['admin_authed'] ?? null) === true) {
        return;
    }

    $currentPath = $_SERVER['REQUEST_URI'] ?? 'dashboard.php';
    http_response_code(302);
    header('Location: login.php?next=' . urlencode($currentPath));
    exit;
}

/**
 * Genera (si no existe) y devuelve el token CSRF guardado en sesion.
 */
function admin_csrf_token(): string
{
    admin_session_start();
    if (empty($_SESSION['admin_csrf_token'])) {
        $_SESSION['admin_csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['admin_csrf_token'];
}

/**
 * Verifica un token CSRF enviado por el cliente contra el de la sesion.
 */
function admin_csrf_check(string $submitted): bool
{
    admin_session_start();
    $expected = $_SESSION['admin_csrf_token'] ?? '';
    return $expected !== '' && $submitted !== '' && hash_equals($expected, $submitted);
}

/**
 * Throttle de fuerza bruta: true si hubo 5+ intentos fallidos en los
 * ultimos 15 minutos (y de paso limpia los intentos ya vencidos).
 */
function admin_too_many_attempts(): bool
{
    admin_session_start();
    $attempts = is_array($_SESSION['admin_login_attempts'] ?? null) ? $_SESSION['admin_login_attempts'] : [];
    $cutoff = time() - ADMIN_LOGIN_WINDOW_SECONDS;
    $attempts = array_values(array_filter($attempts, static fn($timestamp) => is_int($timestamp) && $timestamp > $cutoff));
    $_SESSION['admin_login_attempts'] = $attempts;
    return count($attempts) >= ADMIN_LOGIN_MAX_ATTEMPTS;
}

/**
 * Registra un intento fallido de login (timestamp actual).
 */
function admin_record_failed_attempt(): void
{
    admin_session_start();
    $attempts = is_array($_SESSION['admin_login_attempts'] ?? null) ? $_SESSION['admin_login_attempts'] : [];
    $attempts[] = time();
    $_SESSION['admin_login_attempts'] = $attempts;
}

/**
 * Limpia el contador de intentos fallidos (tras un login exitoso).
 */
function admin_clear_login_attempts(): void
{
    admin_session_start();
    unset($_SESSION['admin_login_attempts']);
}
