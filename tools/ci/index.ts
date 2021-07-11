/* NOTES: With multiple pipelines could split this into Pulumi.dev and Pulumi.prod */
import { all, interpolate } from '@pulumi/pulumi';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import { listDatabaseAccountConnectionStrings } from '@pulumi/azure-native/documentdb';

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
import { createAppServicePlan } from './services/app-service.service';
import {
  createMediaServiceStorageAccount,
  createMediaService,
} from './services/media.service';
import { createVault, createSecret } from './services/key-vault.service';
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

const mediaServiceStorageAccount = createMediaServiceStorageAccount(
  pulumiConfig.mediaServiceStorageAccountName,
  resourceGroup
);
const mediaService = createMediaService(
  pulumiConfig.mediaServiceName,
  resourceGroup,
  mediaServiceStorageAccount
);

const vault = createVault(pulumiConfig.vaultName, resourceGroup);

const connectionStrings = all([
  resourceGroup.name,
  prodMongoDbAccount.name,
]).apply(([resourceGroupName, accountName]) =>
  listDatabaseAccountConnectionStrings({ resourceGroupName, accountName })
);

const websitesEnableAppServiceStorageSecret = createSecret(
  'WEBSITES_ENABLE_APP_SERVICE_STORAGE',
  interpolate`true`,
  resourceGroup,
  vault
);
const dockerRegistryServerUrlSecret = createSecret(
  'DOCKER_REGISTRY_SERVER_URL',
  interpolate`${containerRegistry.name}.azurecr.io`,
  resourceGroup,
  vault
);
const dockerRegistryServerUsernameSecret = createSecret(
  'DOCKER_REGISTRY_SERVER_USERNAME',
  adminAcrUser.username,
  resourceGroup,
  vault
);
const dockerRegistryServerPasswordSecret = createSecret(
  'DOCKER_REGISTRY_SERVER_PASSWORD',
  adminAcrUser.password,
  resourceGroup,
  vault
);
const mongoDbConnectionStringSecret = createSecret(
  'NX_MONGO_DB_CONNECTION_STRING',
  connectionStrings.apply((cs) => cs.connectionStrings![0].connectionString),
  resourceGroup,
  vault
);
const privateBlobConnectionStringSecret = createSecret(
  'NX_PRIVATE_BLOB_CONNECTION_STRING',
  prodPrivateStorageAccount.primaryEndpoints.blob,
  resourceGroup,
  vault
);
const privateTableConnectionStringSecret = createSecret(
  'NX_PRIVATE_TABLE_CONNECTION_STRING',
  prodPrivateStorageAccount.primaryEndpoints.table,
  resourceGroup,
  vault
);
const publicBlobConnectionStringSecret = createSecret(
  'NX_PUBLIC_BLOB_CONNECTION_STRING',
  prodPublicStorageAccount.primaryEndpoints.blob,
  resourceGroup,
  vault
);
const drpApiUrlSecret = createSecret(
  'NX_DRP_API_URL',
  interpolate`${pulumiConfig.webAppApiUrl}`,
  resourceGroup,
  vault
);
const drpApiAdminKeySecret = createSecret(
  'NX_DRP_API_ADMIN_KEY',
  interpolate`${process.env.NX_DRP_API_ADMIN_KEY}`,
  resourceGroup,
  vault
);
const auth0ClientIdSecret = createSecret(
  'NX_AUTH0_CLIENT_ID',
  interpolate`${process.env.NX_AUTH0_CLIENT_ID}`,
  resourceGroup,
  vault
);
const auth0ClientSecretSecret = createSecret(
  'NX_AUTH0_CLIENT_SECRET',
  interpolate`${process.env.NX_AUTH0_CLIENT_SECRET}`,
  resourceGroup,
  vault
);
const tinyPngApiKeySecret = createSecret(
  'NX_TINY_PNG_API_KEY',
  interpolate`${process.env.NX_TINY_PNG_API_KEY}`,
  resourceGroup,
  vault
);
const ayrshareApiKeySecret = createSecret(
  'NX_AYRSHARE_API_KEY',
  interpolate`${process.env.NX_AYRSHARE_API_KEY}`,
  resourceGroup,
  vault
);

const appServicePlan = createAppServicePlan(
  pulumiConfig.appServicePlanName,
  resourceGroup
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

export const mediaServiceStorageAccountUrn = mediaServiceStorageAccount.urn;
export const mediaServiceUrn = mediaService.urn;

export const vaultUrn = vault.urn;
export const websitesEnableAppServiceStorageSecretUrn =
  websitesEnableAppServiceStorageSecret.urn;
export const dockerRegistryServerUrlSecretUrn =
  dockerRegistryServerUrlSecret.urn;
export const dockerRegistryServerUsernameSecretUrn =
  dockerRegistryServerUsernameSecret.urn;
export const dockerRegistryServerPasswordSecretUrn =
  dockerRegistryServerPasswordSecret.urn;
export const mongoDbConnectionStringSecretUrn =
  mongoDbConnectionStringSecret.urn;
export const privateBlobConnectionStringSecretUrn =
  privateBlobConnectionStringSecret.urn;
export const privateTableConnectionStringSecretUrn =
  privateTableConnectionStringSecret.urn;
export const publicBlobConnectionStringSecretUrn =
  publicBlobConnectionStringSecret.urn;
export const drpApiUrlSecretUrn = drpApiUrlSecret.urn;
export const drpApiAdminKeySecretUrn = drpApiAdminKeySecret.urn;
export const auth0ClientIdSecretUrn = auth0ClientIdSecret.urn;
export const auth0ClientSecretSecretUrn = auth0ClientSecretSecret.urn;
export const tinyPngApiKeySecretUrn = tinyPngApiKeySecret.urn;
export const ayrshareApiKeySecretUrn = ayrshareApiKeySecret.urn;

export const appServicePlanUrn = appServicePlan.urn;
