import { all } from '@pulumi/pulumi';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  DatabaseAccount,
  listDatabaseAccountConnectionStrings,
} from '@pulumi/azure-native/documentdb';
import {
  StorageAccount,
  BlobContainer,
  Table,
  getStorageAccount,
} from '@pulumi/azure-native/storage';
import { Registry } from '@pulumi/azure-native/containerregistry';
import { AdminAcrUser } from './acr.service';
import { AppServicePlan, WebApp } from '@pulumi/azure-native/web';

export const createAppServicePlan = (
  appServicePlanName: string,
  resourceGroup: ResourceGroup
): AppServicePlan =>
  new AppServicePlan(appServicePlanName, {
    name: appServicePlanName,
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    kind: 'Linux',
    reserved: true,
    sku: {
      name: 'S1',
      size: 'S1',
      tier: 'Standard',
      capacity: 1,
    },
  });

export const createWebApp = (
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

  return new WebApp(webAppName, {
    resourceGroupName: resourceGroup.name,
    serverFarmId: appServicePlan.id,
    siteConfig: {
      appCommandLine:
        '--multicontainer-config-type compose --multicontainer-config-file docker-compose.yml',
      appSettings: [
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
  });
};
