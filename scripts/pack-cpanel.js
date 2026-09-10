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

// Use paths relative to rootDir (not absolute paths with a drive letter):
// GNU tar (as shipped with Git Bash/MSYS on Windows) misparses an absolute
// "G:\..." path as a remote "host:path" spec and aborts with
// "Cannot connect to G: resolve failed".
const relZipFile = path.relative(rootDir, zipFile);
const relStagingDir = path.relative(rootDir, stagingDir);

try {
  execFileSync('tar', ['-a', '-cf', relZipFile, '-C', relStagingDir, ...stagingItems], {
    cwd: rootDir,
    stdio: 'inherit',
  });
} catch (err) {
  console.error('❌ Failed to run tar for zip compression:', err.message);
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
