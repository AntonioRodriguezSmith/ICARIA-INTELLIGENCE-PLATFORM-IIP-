# Terraform

Terraform permite definir infraestructura como código (IaC) para despliegue automatizado en la nube.

## Estructura recomendada
- main.tf: definición principal
- variables.tf: variables de entorno
- outputs.tf: salidas

## Ejemplo básico
```hcl
provider "azurerm" {
  features {}
}
resource "azurerm_resource_group" "example" {
  name     = "rg-example"
  location = "East US"
}
```

## Recomendaciones
- Versionar archivos IaC.
- Usar módulos para reutilización.
