import { Config } from '@pulumi/pulumi';

const config = new Config();

export interface PulumiConfig {
  readonly location: string;
  readonly resourceGroupName: string;
  readonly devMongoDbAccountName: string;
  readonly devMongoDbDatabaseName: string;
  readonly prodMongoDbAccountName: string;
  readonly prodMongoDbDatabaseName: string;
  readonly devPrivateStorageAccountName: string;
  readonly devPrivateBlobContainerName: string;
  readonly prodPrivateStorageAccountName: string;
  readonly prodPrivateBlobContainerName: string;
  readonly devPublicStorageAccountName: string;
  readonly devPublicBlobContainerName: string;
  readonly prodPublicStorageAccountName: string;
  readonly prodPublicBlobContainerName: string;
  readonly cdnProfileName: string;
  readonly cdnEndpointName: string;
  readonly containerRegistryName: string;
  readonly nginxImageName: string;
  readonly websiteImageName: string;
  readonly apiImageName: string;
  readonly socketImageName: string;
  readonly mediaServiceStorageAccountName: string;
  readonly mediaServiceName: string;
  readonly vaultName: string;
}

export const getPulumiConfig = (): PulumiConfig => ({
  location: config.require('location'),
  resourceGroupName: config.require('resourceGroupName'),
  devMongoDbAccountName: config.require('devMongoDbAccountName'),
  devMongoDbDatabaseName: config.require('devMongoDbDatabaseName'),
  prodMongoDbAccountName: config.require('prodMongoDbAccountName'),
  prodMongoDbDatabaseName: config.require('prodMongoDbDatabaseName'),
  devPrivateStorageAccountName: config.require('devPrivateStorageAccountName'),
  devPrivateBlobContainerName: config.require('devPrivateBlobContainerName'),
  prodPrivateStorageAccountName: config.require(
    'prodPrivateStorageAccountName'
  ),
  prodPrivateBlobContainerName: config.require('prodPrivateBlobContainerName'),
  devPublicStorageAccountName: config.require('devPublicStorageAccountName'),
  devPublicBlobContainerName: config.require('devPublicBlobContainerName'),
  prodPublicStorageAccountName: config.require('prodPublicStorageAccountName'),
  prodPublicBlobContainerName: config.require('prodPublicBlobContainerName'),
  cdnProfileName: config.require('cdnProfileName'),
  cdnEndpointName: config.require('cdnEndpointName'),
  containerRegistryName: config.require('containerRegistryName'),
  nginxImageName: config.require('nginxImageName'),
  websiteImageName: config.require('websiteImageName'),
  apiImageName: config.require('apiImageName'),
  socketImageName: config.require('socketImageName'),
  mediaServiceStorageAccountName: config.require(
    'mediaServiceStorageAccountName'
  ),
  mediaServiceName: config.require('mediaServiceName'),
  vaultName: config.require('vaultName'),
});
