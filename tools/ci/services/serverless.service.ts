import { FileArchive } from '@pulumi/pulumi/asset';

import { AppServicePlan } from '@pulumi/azure-native/web';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import { WebApp } from '@pulumi/azure-native/web';

import { AzureStorageAccount } from '../interfaces/azure-storage-account.interface';
import { AzureAppServicePlan } from '../interfaces/azure-app-service-plan.interface';
import { getStorageAccountConnectionString } from './storage-account.service';

export const createServerlessPlan = (serverlessPlanName: string) => (
  resourceGroup: ResourceGroup
): AzureAppServicePlan => ({
  resourceGroup,
  appServicePlan: new AppServicePlan(serverlessPlanName, {
    name: serverlessPlanName,
    resourceGroupName: resourceGroup.name,
    kind: 'FunctionApp',
    sku: {
      name: 'Y1',
      tier: 'Dynamic',
    },
  }),
});

export const createServerlessWebApp = (serverlessAppName: string) => (
  appSettings: { name: string; value: string }[]
) => (azureStorageAccount: AzureStorageAccount) => (
  appServicePlan: AppServicePlan
): WebApp =>
  new WebApp(serverlessAppName, {
    resourceGroupName: azureStorageAccount.resourceGroup.name,
    serverFarmId: appServicePlan.id,
    kind: 'functionapp',
    siteConfig: {
      appSettings: [
        {
          name: 'AzureWebJobsStorage',
          value: getStorageAccountConnectionString(azureStorageAccount),
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

export const getServerlessAsset = () => new FileArchive('./javascript');
