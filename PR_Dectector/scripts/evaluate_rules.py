"""Evaluador simple de catálogo de reglas.

Lee `Detector/reglas/rules_catalog.md` y `Detector/reglas/Kpis/condiciones_desglose.csv`,
marca qué condiciones están en el catálogo y escribe `condiciones_with_rules.csv`.

Uso:
    python Detector/scripts/evaluate_rules.py
"""
import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "reglas" / "rules_catalog.md"
INPUT = ROOT / "reglas" / "Kpis" / "condiciones_desglose.csv"
OUT = ROOT / "reglas" / "Kpis" / "condiciones_with_rules.csv"


def load_catalog(path):
    codes = set()
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            if line.startswith('-'):
                codes.add(line.lstrip('-').strip())
    return codes


def normalize(s):
    return s.strip()


def main():
    if not CATALOG.exists():
        print('Catalog not found:', CATALOG)
        return
    if not INPUT.exists():
        print('Input CSV not found:', INPUT)
        return

    catalog = load_catalog(CATALOG)
    rows = []
    with open(INPUT, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for r in reader:
            cond = normalize(r.get('condition') or r.get('Condición') or '')
            r['catalog_modelada'] = 'yes' if cond in catalog else 'no'
            rows.append(r)

    # write output
    with open(OUT, 'w', encoding='utf-8', newline='') as f:
        fieldnames = list(rows[0].keys()) if rows else ['condition','cases','modeladas','no_modeladas','cobertura_pct','catalog_modelada']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow(r)

    print('Wrote', OUT)


if __name__ == '__main__':
    main()
