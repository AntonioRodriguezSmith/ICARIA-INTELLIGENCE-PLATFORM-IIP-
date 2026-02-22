# SonarQube: Análisis de calidad de código

## Integración local

1. Descarga e instala SonarQube Community Edition desde https://www.sonarsource.com/products/sonarqube/downloads/.
2. Descomprime y ejecuta el servidor local:
   ```bash
   cd sonarqube-<version>/bin/windows-x86-64/
   StartSonar.bat
   ```
3. Accede a http://localhost:9000 y crea un proyecto.
4. Obtén el token de SonarQube para análisis.
5. Instala el scanner CLI:
   ```bash
   pip install sonar-scanner
   ```
6. Ejecuta el análisis:
   ```bash
   sonar-scanner -Dsonar.projectKey=icaria-intelligence-platform -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=<token>
   ```

---

## Integración en CI/CD (GitHub Actions)

1. Agrega el token de SonarQube como secreto en GitHub (`SONAR_TOKEN`).
2. Añade un workflow en `.github/workflows/sonarqube.yml`:

```yaml
name: SonarQube Analysis
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  sonarqube:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.x'
      - name: Install sonar-scanner
        run: |
          curl -sSLo sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
          unzip sonar-scanner.zip
          export PATH="$PWD/sonar-scanner-5.0.1.3006-linux/bin:$PATH"
      - name: Run SonarQube analysis
        run: |
          sonar-scanner -Dsonar.projectKey=icaria-intelligence-platform -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=${{ secrets.SONAR_TOKEN }}
```

---

## Recomendaciones
- Revisa los reportes en la interfaz web de SonarQube.
- Corrige los issues de calidad y seguridad detectados.
- Documenta los resultados y comparte con el equipo.

---
// ...existing code...
