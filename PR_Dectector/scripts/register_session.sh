#!/usr/bin/env bash
# Registra una sesión breve en `memoria_chat.md`
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG_FILE="$ROOT_DIR/memoria_chat.md"

if [ -z "$1" ]; then
  echo "Uso: register_session.sh 'Resumen de la sesión'"
  exit 1
fi

echo "Fecha: $(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> "$LOG_FILE"
echo "Resumen: $*" >> "$LOG_FILE"
echo "---" >> "$LOG_FILE"

echo "Sesión registrada en $LOG_FILE"
