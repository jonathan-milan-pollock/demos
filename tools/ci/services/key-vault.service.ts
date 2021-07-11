import { SkuName } from '@pulumi/azure-native/types/enums/keyvault';
import { Output } from '@pulumi/pulumi';
import { getClientConfig } from '@pulumi/azure-native/authorization';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import { Secret, Vault } from '@pulumi/azure-native/keyvault';

export const createVault = (
  vaultName: string,
  resourceGroup: ResourceGroup
) => {
  const clientConfig = getClientConfig();
  const tenantId = clientConfig.then((config) => config.tenantId);
  const currentPrincipal = clientConfig.then((config) => config.objectId);

  return new Vault(vaultName, {
    vaultName,
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    properties: {
      sku: { family: 'A', name: SkuName.Standard },
      tenantId,
      accessPolicies: [
        {
          objectId: currentPrincipal,
          tenantId,
          permissions: {
            secrets: ['delete', 'get', 'list', 'set'],
          },
        },
      ],
    },
  });
};

export const createSecret = (
  secretName: string,
  secretValue: Output<string>,
  resourceGroup: ResourceGroup,
  vault: Vault
) =>
  new Secret(secretName.toLowerCase().replace(/_/g, ''), {
    properties: {
      value: secretValue,
    },
    resourceGroupName: resourceGroup.name,
    secretName: secretName,
    vaultName: vault.name,
  });
