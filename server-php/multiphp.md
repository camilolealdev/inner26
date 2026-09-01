# MultiPHP — forzar PHP 8.0+ para innerspirit.net

El backend PHP usa `strict_types`, `readonly`-friendly sintaxis moderna y
PDO MySQL — **requiere PHP 8.0 o superior**. Si el dominio queda en 7.x
 apache devuelve 500 o código fuente crudo.

## Método recomendado: MultiPHP Manager (cPanel)

1. cPanel → **MultiPHP Manager** (sección Software).
2. Marca el checkbox del dominio `innerspirit.net`.
3. En el menú **PHP Version**, elige **8.1** u **8.2** (si el host no tiene
   8.1+, cualquier 8.x sirve; nunca elijas 7.4 o inferior).
4. **Apply**.
5. Verifica en cPanel → **Terminal** (o SSH):

   ```bash
   php -v
   ```

   o crea temporalmente `public_html/info.php` con `<?php phpinfo();`,
   ábrelo en el navegador y borra el archivo después.

## Método alternativo: handler por `.htaccess` (solo si el host lo requiere)

Algunos hosts CloudLinux permiten fijar la versión por dominio con
`AddHandler`. **NO lo apliques por defecto**: si el handler no existe en el
servidor, Apache ignora la línea (o en el peor caso sirve el PHP mal). Solo
útil si MultiPHP Manager no está disponible o el host te indicó el nombre
exacto del handler.

Si lo necesitas, crea `public_html/.htaccess` (se fusiona con el que ya
subimos) y añade al principio:

```apache
# Handler típico CloudLinux alt-php (el nombre exacto lo da tu proveedor)
<IfModule mod_mime.c>
  AddHandler application/x-httpd-alt-php80___lsphp .php .phtml
</IfModule>
```

Verifica el nombre correcto con tu proveedor de hosting o mirando los
handlers disponibles (cPanel → MultiPHP INI Editor / o `ls /opt/alt/php80/`
vía Terminal).

## Checklist post-cambio

- [ ] `php -v` (o phpinfo) muestra 8.0+ para el dominio.
- [ ] `curl https://innerspirit.net/api/leads -X POST -H "Content-Type: application/json" -d '{}'`
      devuelve JSON de error de validación (400), **no** 500 ni código fuente.
- [ ] Un checkout de prueba devuelve `checkoutUrl` (Wompi) y crea fila en `orders`.
- [ ] El Error Log de cPanel no muestra fatales de sintaxis.
