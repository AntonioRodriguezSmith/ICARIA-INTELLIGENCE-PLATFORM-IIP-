provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "example" {
  name     = "rg-icaria"
  location = "East US"
}
