#!/usr/bin/env node
/**
 * Packager for cPanel deployment.
 * Assembles frontend (dist/) + PHP backend (server-php/api/) + _setup/
 * into deploy/innerspirit-deploy.zip ready to extract in public_html/.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distDir = path.join(rootDir, 'dist');
const serverPhpDir = path.join(rootDir, 'server-php');
const deployDir = path.join(rootDir, 'deploy');
const stagingDir = path.join(deployDir, '.staging');
const zipFile = path.join(deployDir, 'innerspirit-deploy.zip');

console.log('📦 Starting cPanel package generation...');

// 1. Ensure dist/ exists
if (!fs.existsSync(distDir) || !fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('❌ Error: dist/ directory not found or empty. Run "npm run build" first.');
  process.exit(1);
}

// 2. Clean & prepare staging
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(stagingDir, { recursive: true });

// Helper to copy recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 3. Copy dist/ -> staging/
console.log('  → Copying dist/ frontend build...');
copyDir(distDir, stagingDir);

// 4. Copy server-php/api/ -> staging/api/
console.log('  → Copying server-php/api/ backend...');
copyDir(path.join(serverPhpDir, 'api'), path.join(stagingDir, 'api'));

// 5. Create staging/_setup/
console.log('  → Preparing staging/_setup/...');
const setupDir = path.join(stagingDir, '_setup');
fs.mkdirSync(setupDir, { recursive: true });

fs.copyFileSync(path.join(serverPhpDir, '_setup.htaccess'), path.join(setupDir, '.htaccess'));

const setupFiles = [
  'multiphp.md',
  'ROUTES.md',
  'schema.sql',
  'secure_config.example.php',
];
for (const file of setupFiles) {
  const src = path.join(serverPhpDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(setupDir, file));
  }
}

// 6. Compress staging contents into zip
if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}

console.log('  → Creating innerspirit-deploy.zip...');
const stagingItems = fs.readdirSync(stagingDir);

try {
  if (process.platform === 'win32') {
    // GNU tar (Git Bash/MSYS) has no zip support — its `-a` auto-compress
    // only recognizes gzip/bzip2/xz/etc, never zip, so `tar -a -cf x.zip`
    // silently writes a plain POSIX tar archive renamed ".zip" (invalid
    // zip, fails to open anywhere).
    //
    // PowerShell's Compress-Archive is not a safe substitute either: it
    // writes entry names with backslash path separators on Windows
    // (a long-standing Microsoft.PowerShell.Archive bug), which Linux
    // `unzip` on the cPanel server treats as a literal character instead
    // of a directory separator — every nested file lands as one flat
    // file with a literal "\" in its name instead of in its folder.
    // .NET's System.IO.Compression.ZipFile normalizes separators to "/"
    // per the zip spec, so use that directly instead.
    const escape = (s) => s.replace(/'/g, "''");
    const psCommand =
      'Add-Type -AssemblyName System.IO.Compression.FileSystem; ' +
      `[System.IO.Compression.ZipFile]::CreateFromDirectory('${escape(stagingDir)}', ` +
      `'${escape(zipFile)}', [System.IO.Compression.CompressionLevel]::Optimal, $false)`;
    execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', psCommand], {
      stdio: 'inherit',
    });
  } else {
    execFileSync('zip', ['-r', zipFile, ...stagingItems], {
      cwd: stagingDir,
      stdio: 'inherit',
    });
  }
} catch (err) {
  console.error('❌ Failed to create zip archive:', err.message);
  process.exit(1);
} finally {
  // 7. Cleanup staging
  fs.rmSync(stagingDir, { recursive: true, force: true });
}

// 8. Verify zip output
if (fs.existsSync(zipFile)) {
  const stats = fs.statSync(zipFile);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`✅ Successfully generated ${path.relative(rootDir, zipFile)} (${sizeMb} MB)`);
} else {
  console.error('❌ Failed: Zip file was not created');
  process.exit(1);
}
