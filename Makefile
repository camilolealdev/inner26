.PHONY: help install dev build lint test test:run test:coverage clean preview

# ═══════════════════════════════════════════════════════════════════════════
# Inner Spirit Studio — Makefile
# ═══════════════════════════════════════════════════════════════════════════

# ── Instalación ─────────────────────────────────────────────────────────────
install:			## Instalar todas las dependencias
	npm install

# ── Desarrollo ─────────────────────────────────────────────────────────────
dev:				## Levantar servidor de desarrollo (puerto 3000)
	npm run dev

preview:			## Vista previa de la build de producción
	npm run preview

# ── Build ───────────────────────────────────────────────────────────────────
build:				## Construir para producción
	npm run build

deploy:cpanel:		## Construir paquete de despliegue para cPanel (.zip)
	npm run pack:cpanel

# ── Calidad ────────────────────────────────────────────────────────────────
lint:				## Verificar tipos TypeScript
	npm run lint

# ── Testing ─────────────────────────────────────────────────────────────────
test:				## Ejecutar tests en modo watch
	npm test

test:run:			## Ejecutar tests una sola vez
	npm run test:run

test:coverage:		## Ejecutar tests con cobertura
	npm run test:coverage

# ── Limpieza ───────────────────────────────────────────────────────────────
clean:				## Limpiar artefactos de build y cache
	rm -rf dist
	rm -rf node_modules/.vite
	rm -rf node_modules/.cache

# ── Help ───────────────────────────────────────────────────────────────────
help:				## Mostrar esta ayuda
	@echo "Inner Spirit Studio — Comandos disponibles:"
	@echo ""
	@echo "  make install          Instalar dependencias"
	@echo "  make dev              Levantar servidor de desarrollo"
	@echo "  make preview          Vista previa de producción"
	@echo "  make build            Construir para producción"
	@echo "  make deploy:cpanel    Construir paquete .zip para cPanel"
	@echo "  make lint             Verificar tipos TypeScript"
	@echo "  make test             Ejecutar tests en modo watch"
	@echo "  make test:run         Ejecutar tests una vez"
	@echo "  make test:coverage    Ejecutar tests con cobertura"
	@echo "  make clean            Limpiar artefactos"
	@echo ""
