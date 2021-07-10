/* NOTES: With multiple pipelines could split this into Pulumi.dev and Pulumi.prod */
import { ResourceGroup } from '@pulumi/azure-native/resources';

import { createFreeMongoDbAccount } from './services/mongo-db-free.service';
import { createServerlessMongoDbAccount } from './services/mongo-db-serverless.service';
import {
  createMongoDb,
  createMongoDbCollection,
} from './services/mongo-db.service';
import {
  createPrivateStorageAccount,
  createPrivateBlobContainer,
  createPrivateTable,
} from './services/storage-account-private.service';
import {
  createPublicStorageAccount,
  createPublicBlobContainer,
} from './services/storage-account-public.service';
import { createCdnProfile, createCdnEndpoint } from './services/cdn.service';
import {
  createContainerRegistry,
  getAdminAcrUser,
  createImage,
} from './services/acr.service';
import {
  createAppServicePlan,
  createWebApp,
} from './services/app-service.service';
import { getPulumiConfig } from './pulumi-config';

const pulumiConfig = getPulumiConfig();

const resourceGroup = new ResourceGroup(pulumiConfig.resourceGroupName, {
  resourceGroupName: pulumiConfig.resourceGroupName,
  location: pulumiConfig.location,
});

const devMongoDbAccount = createFreeMongoDbAccount(
  pulumiConfig.devMongoDbAccountName,
  resourceGroup
);
const devMongoDb = createMongoDb(
  pulumiConfig.devMongoDbDatabaseName,
  resourceGroup,
  devMongoDbAccount
);
const devMongoDbCollection = createMongoDbCollection(
  pulumiConfig.devMongoDbCollectionName,
  resourceGroup,
  devMongoDbAccount,
  devMongoDb
);

const prodMongoDbAccount = createServerlessMongoDbAccount(
  pulumiConfig.prodMongoDbAccountName,
  resourceGroup
);
const prodMongoDb = createMongoDb(
  pulumiConfig.prodMongoDbDatabaseName,
  resourceGroup,
  prodMongoDbAccount
);
const prodMongoDbCollection = createMongoDbCollection(
  pulumiConfig.prodMongoDbCollectionName,
  resourceGroup,
  prodMongoDbAccount,
  prodMongoDb
);

const devPrivateStorageAccount = createPrivateStorageAccount(
  pulumiConfig.devPrivateStorageAccountName,
  resourceGroup
);
const devPrivateBlobContainer = createPrivateBlobContainer(
  pulumiConfig.devPrivateBlobContainerName,
  resourceGroup,
  devPrivateStorageAccount
);
const devPrivateUsersTableName = createPrivateTable(
  pulumiConfig.devPrivateUsersTableName,
  resourceGroup,
  devPrivateStorageAccount
);
const devPublicStorageAccount = createPublicStorageAccount(
  pulumiConfig.devPublicStorageAccountName,
  resourceGroup
);
const devPublicBlobContainer = createPublicBlobContainer(
  pulumiConfig.devPublicBlobContainerName,
  resourceGroup,
  devPublicStorageAccount
);

const prodPrivateStorageAccount = createPrivateStorageAccount(
  pulumiConfig.prodPrivateStorageAccountName,
  resourceGroup
);
const prodPrivateBlobContainer = createPrivateBlobContainer(
  pulumiConfig.prodPrivateBlobContainerName,
  resourceGroup,
  prodPrivateStorageAccount
);
const prodPrivateUsersTableName = createPrivateTable(
  pulumiConfig.prodPrivateUsersTableName,
  resourceGroup,
  prodPrivateStorageAccount
);
const prodPublicStorageAccount = createPublicStorageAccount(
  pulumiConfig.prodPublicStorageAccountName,
  resourceGroup
);
const prodPublicBlobContainer = createPublicBlobContainer(
  pulumiConfig.prodPublicBlobContainerName,
  resourceGroup,
  prodPublicStorageAccount
);
const cdnProfile = createCdnProfile(pulumiConfig.cdnProfileName, resourceGroup);
const cdnEndpoint = createCdnEndpoint(
  pulumiConfig.cdnEndpointName,
  resourceGroup,
  prodPublicStorageAccount,
  cdnProfile
);

const containerRegistry = createContainerRegistry(
  pulumiConfig.containerRegistryName,
  resourceGroup
);
const adminAcrUser = getAdminAcrUser(resourceGroup, containerRegistry);
const nginxImage = createImage(
  pulumiConfig.nginxImageName,
  containerRegistry,
  adminAcrUser
);
const websiteImage = createImage(
  pulumiConfig.websiteImageName,
  containerRegistry,
  adminAcrUser
);
const apiImage = createImage(
  pulumiConfig.apiImageName,
  containerRegistry,
  adminAcrUser
);
const socketImage = createImage(
  pulumiConfig.socketImageName,
  containerRegistry,
  adminAcrUser
);

const appServicePlan = createAppServicePlan(
  pulumiConfig.appServicePlanName,
  resourceGroup
);
const webApp = createWebApp(
  pulumiConfig.webAppName,
  resourceGroup,
  pulumiConfig.containerRegistryName,
  adminAcrUser,
  appServicePlan
);

export const resourceGroupUrn = resourceGroup.urn;

export const devMongoDbAccountUrn = devMongoDbAccount.urn;
export const devMongoDbDatabaseUrn = devMongoDb.urn;
export const devMongoDbCollectionUrn = devMongoDbCollection.urn;

export const prodMongoDbAccountUrn = prodMongoDbAccount.urn;
export const prodMongoDbDatabaseUrn = prodMongoDb.urn;
export const prodMongoDbCollectionUrn = prodMongoDbCollection.urn;

export const devPrivateStorageAccountUrn = devPrivateStorageAccount.urn;
export const devPrivateBlobContainerUrn = devPrivateBlobContainer.urn;
export const devPrivateUsersTableNameUrn = devPrivateUsersTableName.urn;
export const devPublicStorageAccountUrn = devPublicStorageAccount.urn;
export const devPublicBlobContainerUrn = devPublicBlobContainer.urn;

export const prodPrivateStorageAccountUrn = prodPrivateStorageAccount.urn;
export const prodPrivateBlobContainerUrn = prodPrivateBlobContainer.urn;
export const prodPrivateUsersTableNameUrn = prodPrivateUsersTableName.urn;
export const prodPublicStorageAccountUrn = prodPublicStorageAccount.urn;
export const prodPublicBlobContainerUrn = prodPublicBlobContainer.urn;

export const cdnProfileUrn = cdnProfile.urn;
export const cdnEndpointUrn = cdnEndpoint.urn;

export const containerRegistryUrn = containerRegistry.urn;
export const nginxImageUrn = nginxImage.urn;
export const websiteImageUrn = websiteImage.urn;
export const apiImageUrn = apiImage.urn;
export const socketImageUrn = socketImage.urn;

export const appServicePlanUrn = appServicePlan.urn;
export const webAppUrn = webApp.urn;
