# Guía de Configuración y Buenas Prácticas: Git y GitHub

Esta guía describe cómo configurar, trabajar y colaborar usando Git y GitHub en el entorno ICARIA.

## 1. Configuración Inicial de Git

- Configura tu usuario global:
  ```bash
  git config --global user.name "Tu Nombre"
  git config --global user.email "tu.email@dominio.com"
  ```
- Clona el repositorio:
  ```bash
  git clone https://github.com/AntonioRodriguezSmith/ICARIA-INTELLIGENCE-PLATFORM-IIP-.git
  cd ICARIA-INTELLIGENCE-PLATFORM-IIP-
  ```

## 2. Flujo de Trabajo Básico

- Crea una nueva rama para cada funcionalidad o corrección:
  ```bash
  git checkout -b feature/nombre-funcionalidad
  ```
- Añade y confirma cambios:
  ```bash
  git add <archivo>
  git commit -m "Descripción clara del cambio"
  ```
- Sube tu rama al repositorio remoto:
  ```bash
  git push origin feature/nombre-funcionalidad
  ```
- Abre un Pull Request en GitHub para revisión y merge.

## 3. Resolución de Conflictos

- Si el push es rechazado, ejecuta:
  ```bash
  git pull origin main
  # Resuelve los conflictos si aparecen
  git add <archivo-resuelto>
  git commit
  git push origin feature/nombre-funcionalidad
  ```

## 4. Buenas Prácticas

- Haz commits pequeños y descriptivos.
- No subas archivos generados ni credenciales (.env, node_modules, etc.).
- Usa Pull Requests para todo cambio en main.
- Revisa y comenta los PRs de tus compañeros.
- Mantén tu rama actualizada con main:
  ```bash
  git fetch origin
  git rebase origin/main
  ```

## 5. Integración con GitHub Actions

- Los tests y análisis de calidad se ejecutan automáticamente en cada PR.
- Corrige los errores reportados por los workflows antes de hacer merge.

---
