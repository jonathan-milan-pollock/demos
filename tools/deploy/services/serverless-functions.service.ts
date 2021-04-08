import { FileArchive } from '@pulumi/pulumi/asset';

import { AppServicePlan } from '@pulumi/azure-native/web';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import { StorageAccount } from '@pulumi/azure-native/storage';
import { WebApp } from '@pulumi/azure-native/web';

import { getStorageAccountConnectionString } from './storage-account.service';

export const createServerlessFunctionsPlan = (
  serverlessFunctionsPlanName: string
) => (resourceGroup: ResourceGroup): [ResourceGroup, AppServicePlan] => [
  resourceGroup,
  new AppServicePlan(serverlessFunctionsPlanName, {
    name: serverlessFunctionsPlanName,
    resourceGroupName: resourceGroup.name,
    kind: 'FunctionApp',
    sku: {
      name: 'Y1',
      tier: 'Dynamic',
    },
  }),
];

export const createServerlessFunctionsWebApp = (
  serverlessFunctionsAppName: string
) => (appSettings: { name: string; value: string }[]) => (
  storage: [ResourceGroup, StorageAccount]
) => (serverlessFunctions: [AppServicePlan]): WebApp => {
  const [resourceGroup, storageAccount] = storage;
  const [appServicePlan] = serverlessFunctions;

  return new WebApp(serverlessFunctionsAppName, {
    resourceGroupName: resourceGroup.name,
    serverFarmId: appServicePlan.id,
    kind: 'functionapp',
    siteConfig: {
      appSettings: [
        {
          name: 'AzureWebJobsStorage',
          value: getStorageAccountConnectionString(storage),
        },
        { name: 'FUNCTIONS_EXTENSION_VERSION', value: '~3' },
        { name: 'FUNCTIONS_WORKER_RUNTIME', value: 'node' },
        { name: 'WEBSITE_NODE_DEFAULT_VERSION', value: '~14' },
        ...appSettings,
      ],
      http20Enabled: true,
      nodeVersion: '~14',
    },
  });
};

export const getServerlessFunctionsAsset = () =>
  new FileArchive('./javascript');
