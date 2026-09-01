<?php
declare(strict_types=1);

/**
 * Secrets viven fuera de public_html (no servidos por Apache). En el servidor,
 * este archivo debe existir en /home/<usuario_cpanel>/secure_config/config.php
 * y retornar un array asociativo (ver server-php/secure_config.example.php).
 */
function inner_spirit_config(): array
{
    static $config = null;
    if ($config !== null) {
        return $config;
    }

    $path = dirname(__DIR__, 3) . '/secure_config/config.php';
    if (!is_file($path)) {
        throw new RuntimeException("Config file not found: {$path}");
    }

    $loaded = require $path;
    if (!is_array($loaded)) {
        throw new RuntimeException('secure_config/config.php debe retornar un array');
    }

    $config = $loaded;
    return $config;
}

function inner_spirit_env(string $key, ?string $default = null): ?string
{
    $config = inner_spirit_config();
    if (!array_key_exists($key, $config) || $config[$key] === null || $config[$key] === '') {
        return $default;
    }
    return (string) $config[$key];
}

/**
 * PHP convierte '.' y ' ' en claves de query string a '_' al poblar $_GET,
 * asi que 'data.id' nunca llega como $_GET['data.id']. Parseamos la query
 * string cruda para preservar el nombre exacto del parametro.
 */
function get_raw_query_param(string $name): ?string
{
    $query = $_SERVER['QUERY_STRING'] ?? '';
    if ($query === '') {
        return null;
    }
    foreach (explode('&', $query) as $pair) {
        if ($pair === '') {
            continue;
        }
        $eq = strpos($pair, '=');
        $key = urldecode($eq === false ? $pair : substr($pair, 0, $eq));
        if ($key === $name) {
            return $eq === false ? '' : urldecode(substr($pair, $eq + 1));
        }
    }
    return null;
}
