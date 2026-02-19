import json
import csv
import re
from collections import defaultdict

MD_INPUT = r"Detector/reglas/ejemplos_revisados/ejemplos_validacion.md"
JSON_SUM = r"Detector/reglas/ejemplos_revisados/ejemplos_validacion_summary.json"
OUT_MD = r"Detector/reglas/Kpis/kpis_combined.md"
OUT_CSV = r"Detector/reglas/Kpis/kpis_combined.csv"

def parse_cases_from_md(path):
    cases = defaultdict(lambda: {'total':0,'modeladas':0})
    caso = None
    with open(path,'r',encoding='utf-8') as f:
        for line in f:
            m = re.match(r"Caso\s+(\d+):", line)
            if m:
                caso = int(m.group(1))
                continue
            if caso is None:
                continue
            line = line.strip()
            if line.startswith('✅') or line.startswith('❌'):
                cases[caso]['total'] += 1
                if line.startswith('✅'):
                    cases[caso]['modeladas'] += 1
    return cases

def load_summary(path):
    with open(path,'r',encoding='utf-8') as f:
        return json.load(f)

def compute_distribution_by_state(summary, per_case_counts):
    state_counts = defaultdict(int)
    state_case_list = defaultdict(list)
    for item in summary:
        estado = item.get('estado','SIN_DATOS')
        caso = item['caso']
        state_counts[estado] += 1
        state_case_list[estado].append(caso)

    total_cases = sum(state_counts.values())
    dist = []
    for estado, cases in state_counts.items():
        pct = round(cases/total_cases*100,1) if total_cases>0 else 0
        dist.append({'estado':estado,'casos':cases,'pct':pct,'casos_list': state_case_list[estado]})
    return dist

def compute_conditions_by_state(summary, per_case_counts):
    # sum totals and modeladas per case grouped by estado
    case_to_estado = {item['caso']: item.get('estado','SIN_DATOS') for item in summary}
    agg = defaultdict(lambda: {'cond_total':0,'modeladas':0})
    for caso, counts in per_case_counts.items():
        estado = case_to_estado.get(caso,'SIN_DATOS')
        agg[estado]['cond_total'] += counts['total']
        agg[estado]['modeladas'] += counts['modeladas']
    # prepare list
    rows = []
    for estado, vals in agg.items():
        total = vals['cond_total']
        model = vals['modeladas']
        no_model = total - model
        pct = round(model/total*100,1) if total>0 else None
        rows.append({'estado':estado,'cases':len([c for c in case_to_estado if case_to_estado[c]==estado]),
                     'cond_total':total,'modeladas':model,'no_modeladas':no_model,'cobertura':pct})
    return rows

def write_outputs(dist_cases, cond_rows):
    # MD
    with open(OUT_MD,'w',encoding='utf-8') as f:
        f.write('# KPIs — Combinado\n\n')
        f.write('## 1) Distribución por estado (cuentas de casos)\n\n')
        f.write('| Estado | Casos | % sobre total |\n')
        f.write('|--------|------:|-------------:|\n')
        for d in sorted(dist_cases, key=lambda x: x['estado']):
            f.write(f"| {d['estado']} | {d['casos']} | {d['pct']}% |\n")
        f.write('\n')
        f.write('## 2) Distribución por estado de condiciones\n\n')
        f.write('| Estado | Casos | Condiciones totales | Modeladas | No modeladas | Cobertura % |\n')
        f.write('|--------|------:|-------------------:|---------:|------------:|-----------:|\n')
        for r in sorted(cond_rows, key=lambda x: x['estado']):
            cov = f"{r['cobertura']}%" if r['cobertura'] is not None else 'N/A'
            f.write(f"| {r['estado']} | {r['cases']} | {r['cond_total']} | {r['modeladas']} | {r['no_modeladas']} | {cov} |\n")

    # CSV
    with open(OUT_CSV,'w',encoding='utf-8',newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['indicator','estado','cases','cond_total','modeladas','no_modeladas','cobertura_pct'])
        for r in cond_rows:
            writer.writerow(['conditions_by_state', r['estado'], r['cases'], r['cond_total'], r['modeladas'], r['no_modeladas'], r['cobertura'] if r['cobertura'] is not None else ''])
        for d in dist_cases:
            writer.writerow(['cases_distribution', d['estado'], d['casos'], '', '', '', d['pct']])

    print('Wrote', OUT_MD, 'and', OUT_CSV)

def main():
    per_case = parse_cases_from_md(MD_INPUT)
    summary = load_summary(JSON_SUM)
    dist_cases = compute_distribution_by_state(summary, per_case)
    cond_rows = compute_conditions_by_state(summary, per_case)
    write_outputs(dist_cases, cond_rows)

if __name__ == '__main__':
    main()
