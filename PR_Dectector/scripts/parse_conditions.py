import re
from collections import defaultdict
import json

MD_PATH = r"Detector/reglas/ejemplos_revisados/ejemplos_validacion.md"
OUT_CSV = r"Detector/reglas/Kpis/condiciones_desglose.csv"
OUT_MD = r"Detector/reglas/Kpis/condiciones_desglose.md"

def normalize(cond_text):
    # prefer code after last ' - ' if present
    if ' - ' in cond_text:
        return cond_text.split(' - ')[-1].strip()
    return re.sub(r"\s+"," ", cond_text).strip()

def main():
    with open(MD_PATH, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    cond_cases = defaultdict(set)
    cond_modelados = defaultdict(set)

    caso = None
    for line in lines:
        m = re.match(r"Caso\s+(\d+):", line)
        if m:
            caso = int(m.group(1))
            continue
        if caso is None:
            continue
        line = line.strip()
        if line.startswith('✅') or line.startswith('❌'):
            mark = line[0]
            text = line[1:].strip()
            # remove leading bullets or checkmarks
            # extract condition phrase (take before any parenthesis)
            # split on ' - ' often contains code
            cond = normalize(text)
            # Sometimes text is like 'MIFID firmado (minorista) - ES_PERSONA_FISICA'
            # normalize to uppercase code when present
            cond_key = cond
            cond_cases[cond_key].add(caso)
            if line.startswith('✅'):
                cond_modelados[cond_key].add(caso)

    # write CSV
    with open(OUT_CSV, 'w', encoding='utf-8') as f:
        f.write('condition,cases,modeladas,no_modeladas,cobertura_pct\n')
        for cond in sorted(cond_cases.keys()):
            cases = len(cond_cases[cond])
            model = len(cond_modelados.get(cond, []))
            no_model = cases - model
            pct = round((model / cases * 100),1) if cases>0 else ''
            f.write(f'"{cond}",{cases},{model},{no_model},{pct}\n')

    # write markdown
    with open(OUT_MD, 'w', encoding='utf-8') as f:
        f.write('# Desglose por condición\n\n')
        f.write('| Condición | Casos | Modeladas | No modeladas | Cobertura % |\n')
        f.write('|-----------|------:|---------:|------------:|-----------:|\n')
        for cond in sorted(cond_cases.keys()):
            cases = len(cond_cases[cond])
            model = len(cond_modelados.get(cond, []))
            no_model = cases - model
            pct = round((model / cases * 100),1) if cases>0 else 'N/A'
            safe = cond.replace('|','\\|')
            f.write(f'| {safe} | {cases} | {model} | {no_model} | {pct} |\n')

    print('Wrote', OUT_CSV, 'and', OUT_MD)

if __name__ == '__main__':
    main()
