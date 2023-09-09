# 1. Specify the version of the AzureRM Provider to use
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.1"
    }
  }
}

provider "azurerm" {
  features {}
}

# Create a resource group
resource "azurerm_resource_group" "terraformRG" {
  name     = "terraformRG"
  location = "eastus"
}

# Create a virtual network in the resource group
resource "azurerm_virtual_network" "terraformVNet" {
  name                = "terraformVNet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.terraformRG.location
  resource_group_name = azurerm_resource_group.terraformRG.name
}

# Create a subnet in the virtual network
resource "azurerm_subnet" "terraformSubnet" {
  name                 = "internal"
  resource_group_name  = azurerm_resource_group.terraformRG.name
  virtual_network_name = azurerm_virtual_network.terraformVNet.name
  address_prefixes     = ["10.0.2.0/24"]
}

# Create a network interface card (nic) for the virtual machine
resource "azurerm_network_interface" "terraformNIC" {
  name                = "terraformNIC"
  location            = azurerm_resource_group.terraformRG.location
  resource_group_name = azurerm_resource_group.terraformRG.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.terraformSubnet.id
    private_ip_address_allocation = "Dynamic"
  }
}

# Create virtual machine 
resource "azurerm_windows_virtual_machine" "terraformVM" {
  name                = "terraformVM"
  resource_group_name = azurerm_resource_group.terraformRG.name
  location            = azurerm_resource_group.terraformRG.location
  size                = "Standard_DS1_v2"
  admin_username      = "adminuser"
  admin_password      = "P@$$w0rd1234!"
  network_interface_ids = [
    azurerm_network_interface.terraformNIC.id,
  ]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "MicrosoftWindowsServer"
    offer     = "WindowsServer"
    sku       = "2016-Datacenter"
    version   = "latest"
  }
}

# Can access data that was accessed somewhere else
data "azurerm_resource_group" "terraformRG" {
  name = "terraformRG"
}

output "id" {
  value = data.azurerm_resource_group.terraformRG.id
}
