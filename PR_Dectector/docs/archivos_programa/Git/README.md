# Guía de Configuración y Uso de Git Local

Esta guía cubre la configuración, comandos útiles y personalización de Git para el trabajo local en el entorno ICARIA.

## 1. Configuración Básica

- Configura tu usuario global:
  ```bash
  git config --global user.name "Tu Nombre"
  git config --global user.email "tu.email@dominio.com"
  ```
- Verifica la configuración:
  ```bash
  git config --list
  ```

## 2. Comandos Esenciales

- Estado del repositorio:
  ```bash
  git status
  ```
- Ver cambios:
  ```bash
  git diff
  ```
- Añadir archivos:
  ```bash
  git add <archivo>
  ```
- Confirmar cambios:
  ```bash
  git commit -m "Mensaje descriptivo"
  ```
- Ver historial:
  ```bash
  git log --oneline --graph --all
  ```

## 3. Personalización y Alias

- Alias útiles:
  ```bash
  git config --global alias.s "status"
  git config --global alias.lg "log --oneline --graph --all"
  git config --global alias.co "checkout"
  git config --global alias.br "branch"
  ```
- Ahora puedes usar, por ejemplo, `git lg` para ver el historial.

## 4. Hooks Básicos (automatización local)

- Los hooks se encuentran en `.git/hooks/`.
- Ejemplo: Ejecutar tests antes de cada commit. Renombra `pre-commit.sample` a `pre-commit` y añade:
  ```bash
  #!/bin/sh
  npm test
  ```
- Hazlo ejecutable:
  ```bash
  chmod +x .git/hooks/pre-commit
  ```

## 5. Solución de Problemas

- Deshacer cambios locales:
  ```bash
  git restore <archivo>
  ```
- Deshacer un commit local (sin push):
  ```bash
  git reset --soft HEAD~1
  ```
- Limpiar archivos no rastreados:
  ```bash
  git clean -fd
  ```

---

Para colaboración y flujos remotos, consulta la guía de GitHubSpace.
