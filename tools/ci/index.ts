/* NOTES: With multiple pipelines could split this into Pulumi.dev and Pulumi.prod */
import { interpolate } from '@pulumi/pulumi';
import { ResourceGroup } from '@pulumi/azure-native/resources';

import { createFreeMongoDbAccount } from './services/mongo-db-free.service';
import { createServerlessMongoDbAccount } from './services/mongo-db-serverless.service';
import {
  createMongoDb,
  getConnectionString,
} from './services/mongo-db.service';
import { createPrivateStorageAccount } from './services/storage-account-private.service';
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

const prodMongoDbAccount = createServerlessMongoDbAccount(
  pulumiConfig.prodMongoDbAccountName,
  resourceGroup
);
const prodMongoDb = createMongoDb(
  pulumiConfig.prodMongoDbDatabaseName,
  resourceGroup,
  prodMongoDbAccount
);

const devPrivateStorageAccount = createPrivateStorageAccount(
  pulumiConfig.devPrivateStorageAccountName,
  resourceGroup
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
const dockerRegistryServerPasswordSecret = createSecret(
  'DOCKER-REGISTRY-SERVER-PASSWORD',
  adminAcrUser.password,
  resourceGroup,
  vault
);
const auth0ClientIdSecret = createSecret(
  'NX-AUTH0-CLIENT-ID',
  interpolate`${process.env.NX_AUTH0_CLIENT_ID}`,
  resourceGroup,
  vault
);
const auth0ClientSecretSecret = createSecret(
  'NX-AUTH0-CLIENT-SECRET',
  interpolate`${process.env.NX_AUTH0_CLIENT_SECRET}`,
  resourceGroup,
  vault
);
const googleDriveClientEmailSecret = createSecret(
  'NX-GOOGLE-DRIVE-CLIENT-EMAIL',
  interpolate`${process.env.NX_GOOGLE_DRIVE_CLIENT_EMAIL}`,
  resourceGroup,
  vault
);
const googleDrivePrivateKeySecret = createSecret(
  'NX-GOOGLE-DRIVE-PRIVATE-KEY',
  interpolate`${process.env.NX_GOOGLE_DRIVE_PRIVATE_KEY}`,
  resourceGroup,
  vault
);
const googleDriveClientsFolderIdSecret = createSecret(
  'NX-GOOGLE-DRIVE-CLIENTS-FOLDER-ID',
  interpolate`${process.env.NX_GOOGLE_DRIVE_CLIENTS_FOLDER_ID}`,
  resourceGroup,
  vault
);
const googleDriveWebsitesFolderIdSecret = createSecret(
  'NX-GOOGLE-DRIVE-WEBSITES-FOLDER-ID',
  interpolate`${process.env.NX_GOOGLE_DRIVE_WEBSITES_FOLDER_ID}`,
  resourceGroup,
  vault
);
const mongoDbConnectionStringSecret = createSecret(
  'NX-MONGO-DB-CONNECTION-STRING',
  getConnectionString(
    pulumiConfig.prodMongoDbDatabaseName,
    resourceGroup,
    prodMongoDbAccount
  ),
  resourceGroup,
  vault
);
const azureStorageConnectionStringSecret = createSecret(
  'AZURE-STORAGE-CONNECTION-STRING',
  prodPrivateStorageAccount.primaryEndpoints.table,
  resourceGroup,
  vault
);
const azureStorageConnectionStringPublicSecret = createSecret(
  'AZURE-STORAGE-BLOB-CONNECTION-STRING-PUBLIC',
  prodPublicStorageAccount.primaryEndpoints.blob,
  resourceGroup,
  vault
);
const azureStorageBlobContainerNameSecret = createSecret(
  'AZURE-STORAGE-BLOB-CONTAINER-NAME-PUBLIC',
  interpolate`${process.env.AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC}`,
  resourceGroup,
  vault
);
const tinyPngApiKeySecret = createSecret(
  'NX-TINY-PNG-API-KEY',
  interpolate`${process.env.NX_TINY_PNG_API_KEY}`,
  resourceGroup,
  vault
);
const ayrshareApiKeySecret = createSecret(
  'NX-AYRSHARE-API-KEY',
  interpolate`${process.env.NX_AYRSHARE_API_KEY}`,
  resourceGroup,
  vault
);

export const resourceGroupUrn = resourceGroup.urn;

export const devMongoDbAccountUrn = devMongoDbAccount.urn;
export const devMongoDbDatabaseUrn = devMongoDb.urn;

export const prodMongoDbAccountUrn = prodMongoDbAccount.urn;
export const prodMongoDbDatabaseUrn = prodMongoDb.urn;

export const devPrivateStorageAccountUrn = devPrivateStorageAccount.urn;
export const devPublicStorageAccountUrn = devPublicStorageAccount.urn;
export const devPublicBlobContainerUrn = devPublicBlobContainer.urn;

export const prodPrivateStorageAccountUrn = prodPrivateStorageAccount.urn;
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
export const dockerRegistryServerPasswordSecretUrn =
  dockerRegistryServerPasswordSecret.urn;
export const auth0ClientIdSecretUrn = auth0ClientIdSecret.urn;
export const auth0ClientSecretSecretUrn = auth0ClientSecretSecret.urn;
export const googleDriveClientEmailSecretUrn = googleDriveClientEmailSecret.urn;
export const googleDrivePrivateKeySecretUrn = googleDrivePrivateKeySecret.urn;
export const googleDriveClientsFolderIdSecretUrn =
  googleDriveClientsFolderIdSecret.urn;
export const googleDriveWebsitesFolderIdSecretUrn =
  googleDriveWebsitesFolderIdSecret.urn;
export const mongoDbConnectionStringSecretUrn =
  mongoDbConnectionStringSecret.urn;
export const azureStorageConnectionStringSecretUrn =
  azureStorageConnectionStringSecret.urn;
export const azureStorageConnectionStringPublicSecretUrn =
  azureStorageConnectionStringPublicSecret.urn;
export const azureStorageBlobContainerNameSecretUrn =
  azureStorageBlobContainerNameSecret.urn;
export const tinyPngApiKeySecretUrn = tinyPngApiKeySecret.urn;
export const ayrshareApiKeySecretUrn = ayrshareApiKeySecret.urn;
export const azureStorageBlobContainerName =
  process.env.AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC;
