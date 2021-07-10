import { ResourceGroup } from '@pulumi/azure-native/resources';
import { AppServicePlan, WebApp } from '@pulumi/azure-native/web';

import { AdminAcrUser } from './acr.service';

export const createAppServicePlan = (
  appServicePlanName: string,
  resourceGroup: ResourceGroup
) =>
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
  resourceGroup: ResourceGroup,
  containerRegistryName: string,
  adminAcrUser: AdminAcrUser,
  appServicePlan: AppServicePlan
): WebApp =>
  new WebApp(webAppName, {
    resourceGroupName: resourceGroup.name,
    serverFarmId: appServicePlan.id,
    siteConfig: {
      appCommandLine:
        '--multicontainer-config-type compose --multicontainer-config-file docker-compose.yml',
      appSettings: [
        {
          name: 'DOCKER_REGISTRY_SERVER_URL',
          value: `${containerRegistryName}.azurecr.io`,
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
          name: 'NX_AUTH0_CLIENT_ID',
          value: process.env.NX_AUTH0_CLIENT_ID,
        },
        {
          name: 'NX_AUTH0_CLIENT_SECRET',
          value: process.env.NX_AUTH0_CLIENT_SECRET,
        },
        {
          name: 'NX_DRP_API_URL', // get this from here
          value: process.env.NX_DRP_API_URL,
        },
        {
          name: 'NX_DRP_API_ADMIN_KEY',
          value: process.env.NX_DRP_API_ADMIN_KEY,
        },
        {
          name: 'NX_MONGO_DB_CONNECTION_STRING', // get this from here
          value: process.env.NX_MONGO_DB_CONNECTION_STRING,
        },
        {
          name: 'NX_AZURE_STORAGE_CONNECTION_STRING', // get this from here
          value: process.env.NX_AZURE_STORAGE_CONNECTION_STRING,
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
