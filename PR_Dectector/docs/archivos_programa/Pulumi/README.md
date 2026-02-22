# Pulumi

Pulumi es una alternativa a Terraform para IaC, permitiendo definir infraestructura usando lenguajes como Python, TypeScript, Go.

## Estructura recomendada
- Pulumi.yaml: configuración del proyecto
- __main__.py / index.ts: lógica de infraestructura

## Ejemplo básico en Python
```python
import pulumi
import pulumi_azure_native as azure_native
resource_group = azure_native.resources.ResourceGroup('example')
```

## Recomendaciones
- Versionar scripts.
- Integrar con CI/CD.
