# Deploy a cPanel vía Git (Git Version Control nativo)

Alternativa al empaquetado manual (`npm run pack:cpanel` + subir zip por
File Manager): cPanel clona este repo de GitHub directamente en el servidor
y usa `.cpanel.yml` (raíz del repo) para copiar los archivos correctos a
`public_html/` cada vez que se despliega.

**Importante:** esto NO se dispara solo con `git push` a GitHub. cPanel
tiene que jalar el commit (paso 3 más abajo). Es "deploy vía git", no CI/CD
automático — para eso se necesitaría un webhook o GitHub Actions con SSH
(ver alternativas al final).

## 0. Requisito no verificado — confírmalo antes de confiar en esto

`.cpanel.yml` intenta compilar el frontend (`npm run build`) **en el
servidor**, usando el entorno Node que provee la función "Setup Node.js
App" de cPanel. No pude verificar si tu hosting ofrece esa función ni qué
versión de Node trae. Antes de depender de este flujo:

```bash
# Por SSH, dentro de la cuenta cPanel:
which node; which npm; node -v
```

- Si eso funciona → sigue con el setup de abajo.
- Si tu host **no** tiene Node disponible (hosting compartido básico sin
  "Setup Node.js App"), dímelo: cambio `.cpanel.yml` para que solo copie
  archivos y muevo el `npm run build` a un GitHub Action que empuje el
  `dist/` ya compilado a una rama de deploy.

## 1. Setup Node.js App (una sola vez, solo para tener `node`/`npm`)

El sitio lo sirve Apache/PHP, no Node — este paso solo provisiona el
`nodevenv` que `.cpanel.yml` activa para poder correr `npm run build`.

1. cPanel → **Setup Node.js App** → **Create Application**.
2. **Node.js version:** la misma que vas a poner en `<NODE_VERSION>` de
   `.cpanel.yml` (18 o 20).
3. **Application mode:** Development (no importa, no se va a servir tráfico
   desde aquí).
4. **Application root:** el mismo path que usarás para el clone del repo,
   por ejemplo `repositories/inner` (ver paso 2).
5. **Application URL:** cualquier subdominio/placeholder, no se usa.
6. Guarda. Anota la ruta del `nodevenv` que te muestra (algo como
   `/home/<usuario>/nodevenv/repositories/inner/20`).

## 2. Git Version Control → clonar este repo

1. cPanel → **Git™ Version Control** → **Create**.
2. **Clone a Repository** (activar el toggle).
3. **Clone URL:** la URL de GitHub. Si el repo es privado necesitas que la
   cuenta cPanel tenga una llave SSH autorizada como *Deploy Key* en
   GitHub (Settings → Deploy keys del repo), o usar HTTPS con un Personal
   Access Token en la URL.
4. **Repository Path:** el mismo `repositories/inner` del paso 1.
5. **Repository Name:** lo que quieras.
6. Crea. cPanel clona el repo completo (con `node_modules` fuera de
   `public_html`, no expuesto a la web — correcto).

## 3. Editar `.cpanel.yml` con tus datos reales

Antes del primer deploy, reemplaza en `.cpanel.yml` (commitéalo a `main`):

- `<CPANEL_USER>` → tu usuario cPanel.
- `<REPO_PATH>` → `repositories/inner` (o el que hayas usado).
- `<NODE_VERSION>` → la versión elegida en el paso 1.

## 4. Configurar secretos (fuera de public_html, una sola vez)

Igual que en el deploy manual — `.cpanel.yml` **no** toca esto:

```bash
mkdir -p /home/<usuario>/secure_config
cp /home/<usuario>/repositories/inner/server-php/secure_config.example.php \
   /home/<usuario>/secure_config/config.php
# editar config.php con credenciales reales de MySQL, Mercado Pago, Wompi, SMTP
```

Y confirma PHP 8.0+ en MultiPHP Manager (ver `server-php/multiphp.md`) y la
base de datos MySQL + `server-php/schema.sql` (ver checklist en
`docs/BRECHAS-Y-PENDIENTES.md`, sección E).

## 5. Desplegar

Cada vez que quieras publicar el `main` actual de GitHub:

1. cPanel → Git Version Control → tu repo → **Manage**.
2. **Update from Remote** (hace `git pull` del remoto configurado).
3. **Deploy HEAD Commit** (corre las tareas de `.cpanel.yml`: build +
   copia a `public_html/`).

Revisa el log de deploy que muestra cPanel; si `npm run build` falla ahí
es donde vas a ver si el supuesto del paso 0 era correcto.

## Alternativas si quieres que sea automático en cada push

Este método siempre requiere el clic manual de "Update from Remote" +
"Deploy HEAD Commit" (o automatizar esos dos UAPI calls tú mismo por cron/
webhook). Si prefieres que un push a `main` dispare el deploy solo, las
opciones son:

- **GitHub Actions + SSH:** un workflow que hace SSH al servidor y corre
  `git -C ~/repositories/inner pull && <tareas de .cpanel.yml>` en cada
  push.
- **GitHub Actions + SFTP/FTP:** construye en el runner de GitHub (Node
  garantizado) y sube `dist/` + `server-php/api/` directo a `public_html`
  por SFTP/FTP, sin depender de Node en el hosting.

Dime si quieres que arme cualquiera de las dos.
