/* NOTES: With multiple pipelines could split this into Pulumi.dev and Pulumi.prod */
import { interpolate } from '@pulumi/pulumi';
import { ResourceGroup } from '@pulumi/azure-native/resources';

import { createFreeMongoDbAccount } from './services/mongo-db-free.service';
import { createServerlessMongoDbAccount } from './services/mongo-db-serverless.service';
import {
  createMongoDb,
  getConnectionString,
} from './services/mongo-db.service';
import {
  createPrivateStorageAccount,
  createPrivateBlobContainer,
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
const mongoDbConnectionStringSecret = createSecret(
  'NX-MONGO-DB-CONNECTION-STRING',
  getConnectionString(resourceGroup, prodMongoDbAccount),
  resourceGroup,
  vault
);
const privateBlobConnectionStringSecret = createSecret(
  'NX-PRIVATE-BLOB-CONNECTION-STRING',
  prodPrivateStorageAccount.primaryEndpoints.blob,
  resourceGroup,
  vault
);
const privateTableConnectionStringSecret = createSecret(
  'NX-PRIVATE-TABLE-CONNECTION-STRING',
  prodPrivateStorageAccount.primaryEndpoints.table,
  resourceGroup,
  vault
);
const publicBlobConnectionStringSecret = createSecret(
  'NX-PUBLIC-BLOB-CONNECTION-STRING',
  prodPublicStorageAccount.primaryEndpoints.blob,
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
const logzioTokenSecret = createSecret(
  'NX-LOGZIO-TOKEN',
  interpolate`${process.env.NX_LOGZIO_TOKEN}`,
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
export const socketImageUrn = socketImage.urn;

export const mediaServiceStorageAccountUrn = mediaServiceStorageAccount.urn;
export const mediaServiceUrn = mediaService.urn;

export const vaultUrn = vault.urn;
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
export const auth0ClientIdSecretUrn = auth0ClientIdSecret.urn;
export const auth0ClientSecretSecretUrn = auth0ClientSecretSecret.urn;
export const tinyPngApiKeySecretUrn = tinyPngApiKeySecret.urn;
export const ayrshareApiKeySecretUrn = ayrshareApiKeySecret.urn;
export const logzioTokenSecretUrn = logzioTokenSecret.urn;
