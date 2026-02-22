import pulumi
import pulumi_azure_native as azure_native

# Crear un grupo de recursos en Azure
resource_group = azure_native.resources.ResourceGroup('icaria-rg')

pulumi.export('resource_group_name', resource_group.name)
