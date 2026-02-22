#!/usr/bin/env python3
from pathlib import Path
p = Path("data/reglas/ejemplos_revisados/ejemplos_validacion_summary.json")
s = p.read_text(encoding="utf-8")
old_crlf = '}\r\n  {'
old_lf = '}\n  {'
if old_crlf in s:
    s = s.replace(old_crlf, '},\r\n  {', 1)
    p.write_text(s, encoding="utf-8")
    print("Parche aplicado (CRLF)")
elif old_lf in s:
    s = s.replace(old_lf, '},\n  {', 1)
    p.write_text(s, encoding="utf-8")
    print("Parche aplicado (LF)")
else:
    print("Patrón no encontrado")
