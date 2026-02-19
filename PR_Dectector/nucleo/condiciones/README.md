# Condiciones — ruta y uso

Ubicación: `Detector/reglas/condiciones`

Archivos principales en esta carpeta:

- `condiciones_icaria.md` — catálogo legible (tabla) de condiciones: **Dominio | Nombre | Descripción**.
- `condiciones_icaria.csv` — versión CSV del catálogo (consumible por scripts).
- `condiciones_icaria.json` — versión JSON del catálogo (consumible por scripts y APIs).

Uso y notas:

- Scripts que consumen estas condiciones:
  - `Detector/scripts/evaluate_rules.py` — compara condiciones extraídas de casos con el catálogo.
  - Otros scripts de validación y generación de KPIs pueden leer `condiciones_icaria.json` o `.csv`.

- Ruta relativa desde el repositorio raíz: `Detector/reglas/condiciones`.

Si actualizas el catálogo, procura mantener sincronizados los tres formatos (`.md`, `.csv`, `.json`).

Comandos rápidos para inspección (PowerShell):

```powershell
# Mostrar MD
type Detector\reglas\condiciones\condiciones_icaria.md

# Contar líneas en CSV
Get-Content Detector\reglas\condiciones\condiciones_icaria.csv | Measure-Object -Line

# Validar JSON rápido
python -c "import json; json.load(open('Detector/reglas/condiciones/condiciones_icaria.json','r',encoding='utf-8')); print('JSON OK')"
```
