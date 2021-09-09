import { interpolate } from '@pulumi/pulumi';
import { ResourceGroup } from '@pulumi/azure-native/resources';

import {
  createContainerRegistry,
  getAdminAcrUser,
  createImage,
} from './services/acr.service';
import { createCdnProfile, createCdnEndpoint } from './services/cdn.service';
import { createVault, createSecret } from './services/key-vault.service';
import {
  createMediaServiceStorageAccount,
  createMediaService,
} from './services/media.service';
import { createFreeMongoDbAccount } from './services/mongo-db-free.service';
import { createServerlessMongoDbAccount } from './services/mongo-db-serverless.service';
import {
  createMongoDb,
  getMongoDbConnectionString,
} from './services/mongo-db.service';
import {
  createPrivateBlobContainer,
  createPrivateStorageAccount,
} from './services/storage-account-private.service';
import {
  createPublicStorageAccount,
  createPublicBlobContainer,
} from './services/storage-account-public.service';
import { getStorageAccountConnectionString } from './services/storage-account.service';
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
const devPrivateBlobContainer = createPrivateBlobContainer(
  pulumiConfig.devPrivateBlobContainerName,
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
const googleDriveDarkRushPhotographyFolderIdSecret = createSecret(
  'NX-GOOGLE-DRIVE-DARK-RUSH-FOLDER-ID',
  interpolate`${process.env.NX_GOOGLE_DRIVE_DARK_RUSH_FOLDER_ID}`,
  resourceGroup,
  vault
);
const googleDriveDarkRushFolderIdSecret = createSecret(
  'NX-GOOGLE-DRIVE-DARK-RUSH-PHOTOGRAPHY-FOLDER-ID',
  interpolate`${process.env.NX_GOOGLE_DRIVE_DARK_RUSH_PHOTOGRAPHY_FOLDER_ID}`,
  resourceGroup,
  vault
);
const mongoDbConnectionStringSecret = createSecret(
  'NX-MONGO-DB-CONNECTION-STRING',
  getMongoDbConnectionString(
    pulumiConfig.prodMongoDbDatabaseName,
    resourceGroup,
    prodMongoDbAccount
  ),
  resourceGroup,
  vault
);
const azureStorageConnectionStringSecret = createSecret(
  'AZURE-STORAGE-CONNECTION-STRING',
  getStorageAccountConnectionString(
    pulumiConfig.prodPrivateStorageAccountName,
    resourceGroup
  ),
  resourceGroup,
  vault
);
const azureStorageConnectionStringPublicSecret = createSecret(
  'AZURE-STORAGE-CONNECTION-STRING-PUBLIC',
  getStorageAccountConnectionString(
    pulumiConfig.prodPublicStorageAccountName,
    resourceGroup
  ),
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
export const devPrivateBlobContainerUrn = devPrivateBlobContainer.urn;
export const devPublicStorageAccountUrn = devPublicStorageAccount.urn;
export const devPublicBlobContainerUrn = devPublicBlobContainer.urn;

export const prodPrivateStorageAccountUrn = prodPrivateStorageAccount.urn;
export const prodPrivateBlobContainerUrn = prodPrivateBlobContainer.urn;
export const prodPublicStorageAccountUrn = prodPublicStorageAccount.urn;
export const prodPublicBlobContainerUrn = prodPublicBlobContainer.urn;

export const cdnProfileUrn = cdnProfile.urn;
export const cdnEndpointUrn = cdnEndpoint.urn;

export const containerRegistryUrn = containerRegistry.urn;
export const nginxImageUrn = nginxImage.urn;
export const websiteImageUrn = websiteImage.urn;
export const apiImageUrn = apiImage.urn;

export const mediaServiceStorageAccountUrn = mediaServiceStorageAccount.urn;
export const mediaServiceUrn = mediaService.urn;

export const vaultUrn = vault.urn;
export const dockerRegistryServerPasswordSecretUrn =
  dockerRegistryServerPasswordSecret.urn;
export const googleDriveClientEmailSecretUrn = googleDriveClientEmailSecret.urn;
export const googleDrivePrivateKeySecretUrn = googleDrivePrivateKeySecret.urn;
export const googleDriveDarkRushPhotographyFolderIdSecretUrn =
  googleDriveDarkRushPhotographyFolderIdSecret.urn;
export const googleDriveDarkRushFolderIdSecretUrn =
  googleDriveDarkRushFolderIdSecret.urn;
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
