import { Config } from '@pulumi/pulumi';

const config = new Config();

export interface PulumiConfig {
  readonly location: string;
  readonly resourceGroupName: string;
  readonly devMongoDbAccountName: string;
  readonly devMongoDbDatabaseName: string;
  readonly devMongoDbCollectionName: string;
  readonly prodMongoDbAccountName: string;
  readonly prodMongoDbDatabaseName: string;
  readonly prodMongoDbCollectionName: string;
  readonly devPrivateStorageAccountName: string;
  readonly devPrivateBlobContainerName: string;
  readonly devPrivateUsersTableName: string;
  readonly prodPrivateStorageAccountName: string;
  readonly prodPrivateBlobContainerName: string;
  readonly prodPrivateUsersTableName: string;
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
  readonly appServicePlanName: string;
}

export const getPulumiConfig = (): PulumiConfig => ({
  location: config.require('location'),
  resourceGroupName: config.require('resourceGroupName'),
  devMongoDbAccountName: config.require('devMongoDbAccountName'),
  devMongoDbDatabaseName: config.require('devMongoDbDatabaseName'),
  devMongoDbCollectionName: config.require('devMongoDbCollectionName'),
  prodMongoDbAccountName: config.require('prodMongoDbAccountName'),
  prodMongoDbDatabaseName: config.require('prodMongoDbDatabaseName'),
  prodMongoDbCollectionName: config.require('prodMongoDbCollectionName'),
  devPrivateStorageAccountName: config.require('devPrivateStorageAccountName'),
  devPrivateBlobContainerName: config.require('devPrivateBlobContainerName'),
  devPrivateUsersTableName: config.require('devPrivateUsersTableName'),
  prodPrivateStorageAccountName: config.require(
    'prodPrivateStorageAccountName'
  ),
  prodPrivateBlobContainerName: config.require('prodPrivateBlobContainerName'),
  prodPrivateUsersTableName: config.require('prodPrivateUsersTableName'),
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
  appServicePlanName: config.require('appServicePlanName'),
});
