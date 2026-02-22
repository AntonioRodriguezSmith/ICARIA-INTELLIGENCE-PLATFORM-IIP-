import csv
import json

JSON_SUM = r"Detector/reglas/ejemplos_revisados/ejemplos_validacion_summary.json"
CSV_COND = r"Detector/reglas/Kpis/condiciones_desglose.csv"
OUT_MD = r"Detector/reglas/Kpis/ejemplos_validacion_full_summary.md"

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def load_csv(path):
    rows = []
    with open(path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for r in reader:
            # normalize numeric fields
            r['cases'] = int(r['cases']) if r['cases'] else 0
            r['modeladas'] = int(r['modeladas']) if r['modeladas'] else 0
            r['no_modeladas'] = int(r['no_modeladas']) if r['no_modeladas'] else 0
            try:
                r['cobertura_pct'] = float(r['cobertura_pct']) if r['cobertura_pct']!='' else None
            except:
                r['cobertura_pct'] = None
            rows.append(r)
    return rows

def write_md(json_summary, cond_rows_sorted):
    with open(OUT_MD, 'w', encoding='utf-8') as f:
        f.write('# Resumen completo: Casos y Desglose por Condición\n\n')
        f.write('## Resumen de casos (1-67)\n\n')
        f.write('| Caso | Cobertura % | Modeladas | Total | Estado |\n')
        f.write('|------:|-----------:|---------:|------:|:-------|\n')
        for item in sorted(json_summary, key=lambda x: x['caso']):
            pct = item['cobertura_pct'] if item['cobertura_pct'] is not None else 'N/A'
            f.write(f"| {item['caso']} | {pct} | {item['modeladas']} | {item['total']} | {item['estado']} |\n")

        f.write('\n## Desglose por condición (ordenado por casos desc)\n\n')
        f.write('| Condición | Casos | Modeladas | No modeladas | Cobertura % |\n')
        f.write('|:-----------|------:|---------:|------------:|-----------:|\n')
        for r in cond_rows_sorted:
            cov = f"{r['cobertura_pct']}%" if r['cobertura_pct'] not in (None, '') else 'N/A'
            cond = r['condition'].replace('|','\\|')
            f.write(f"| {cond} | {r['cases']} | {r['modeladas']} | {r['no_modeladas']} | {cov} |\n")

    print('Wrote', OUT_MD)

def main():
    js = load_json(JSON_SUM)
    conds = load_csv(CSV_COND)
    conds_sorted = sorted(conds, key=lambda x: x['cases'], reverse=True)
    write_md(js, conds_sorted)

if __name__ == '__main__':
    main()
