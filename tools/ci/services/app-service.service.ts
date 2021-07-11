import { all } from '@pulumi/pulumi';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  DatabaseAccount,
  listDatabaseAccountConnectionStrings,
} from '@pulumi/azure-native/documentdb';
import { StorageAccount } from '@pulumi/azure-native/storage';
import { Registry } from '@pulumi/azure-native/containerregistry';
import { AdminAcrUser } from './acr.service';
import { AppServicePlan, getWebApp, WebApp } from '@pulumi/azure-native/web';

export const createAppServicePlan = (
  appServicePlanName: string,
  resourceGroup: ResourceGroup
): AppServicePlan =>
  new AppServicePlan(appServicePlanName, {
    name: appServicePlanName,
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    kind: 'Linux',
    sku: {
      capacity: 1,
      family: 'S',
      name: 'S1',
      size: 'S1',
      tier: 'Standard',
    },
  });

/**
 * IMPORTANT az webapp create must be run manually to import from
 * this method as using multicontainer which Pulumi does not yet support,
 * (details in ci.md, multicontainer WebApp)
 */
export const updateWebApp = (
  webAppName: string,
  webAppApiUrl: string,
  resourceGroup: ResourceGroup,
  prodMongoDbAccount: DatabaseAccount,
  prodPrivateStorageAccount: StorageAccount,
  prodPublicStorageAccount: StorageAccount,
  containerRegistry: Registry,
  adminAcrUser: AdminAcrUser,
  appServicePlan: AppServicePlan
): WebApp => {
  const connectionStrings = all([
    resourceGroup.name,
    prodMongoDbAccount.name,
  ]).apply(([resourceGroupName, accountName]) =>
    listDatabaseAccountConnectionStrings({ resourceGroupName, accountName })
  );

  return new WebApp(
    webAppName,
    {
      resourceGroupName: resourceGroup.name,
      serverFarmId: appServicePlan.id,
      siteConfig: {
        appSettings: [
          {
            name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE',
            value: 'true',
          },
          {
            name: 'DOCKER_REGISTRY_SERVER_URL',
            value: `${containerRegistry.name}.azurecr.io`,
          },
          {
            name: 'DOCKER_REGISTRY_SERVER_USERNAME',
            value: adminAcrUser.username,
          },
          {
            name: 'DOCKER_REGISTRY_SERVER_PASSWORD',
            value: adminAcrUser.password,
          },
          {
            name: 'NX_DRP_API_URL',
            value: webAppApiUrl,
          },
          {
            name: 'NX_MONGO_DB_CONNECTION_STRING',
            value: connectionStrings.apply(
              (cs) => cs.connectionStrings![0].connectionString
            ),
          },
          {
            name: 'NX_PRIVATE_BLOB_CONNECTION_STRING',
            value: prodPrivateStorageAccount.primaryEndpoints.blob,
          },
          {
            name: 'NX_PRIVATE_TABLE_CONNECTION_STRING',
            value: prodPrivateStorageAccount.primaryEndpoints.table,
          },
          {
            name: 'NX_PUBLIC_BLOB_CONNECTION_STRING',
            value: prodPublicStorageAccount.primaryEndpoints.blob,
          },
          {
            name: 'NX_DRP_API_ADMIN_KEY',
            value: process.env.NX_DRP_API_ADMIN_KEY,
          },
          {
            name: 'NX_AUTH0_CLIENT_ID',
            value: process.env.NX_AUTH0_CLIENT_ID,
          },
          {
            name: 'NX_AUTH0_CLIENT_SECRET',
            value: process.env.NX_AUTH0_CLIENT_SECRET,
          },
          {
            name: 'NX_TINY_PNG_API_KEY',
            value: process.env.NX_TINY_PNG_API_KEY,
          },
          {
            name: 'NX_AYRSHARE_API_KEY',
            value: process.env.NX_AYRSHARE_API_KEY,
          },
        ],
      },
    },
    {
      //import:
      //  '/subscriptions/deeabc6a-57e8-40df-889e-eb7f263360cc/resourceGroups/drp-rg/providers/Microsoft.Web/sites/dark-rush-photography',
      ignoreChanges: [
        'clientAffinityEnabled',
        'clientCertEnabled',
        'clientCertMode',
        'containerSize',
        'customDomainVerificationId',
        'dailyMemoryTimeQuota',
        'enabled',
        'hostNameSslStates',
        'hostNamesDisabled',
        'httpsOnly',
        'keyVaultReferenceIdentity',
        'kind',
        'redundancyMode',
        'storageAccountRequired',
        //'siteConfig',
      ],
    }
  );
};
