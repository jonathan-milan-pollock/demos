import * as pulumi from '@pulumi/pulumi';

const config = new pulumi.Config();

interface PulumiConfig {
  readonly location: string;
  readonly resourceGroupName: string;
  readonly cosmosDbDatabaseAccountName: string;
  readonly cosmosDbDatabaseName: string;
  readonly cosmosDbContainerName: string;
  readonly uploadFunctionsAppName: string;
  readonly publishFunctionsAppName: string;
  readonly uploadsStorageAccountName: string;
  readonly uploadsContainerName: string;
  readonly blobStorageAccountName: string;
  readonly homeBlobContainerName: string;
  readonly reviewBlobContainerName: string;
  readonly reviewsBlobContainerName: string;
  readonly photoOfTheWeekBlobContainerName: string;
  readonly storiesBlobContainerName: string;
  readonly destinationsBlobContainerName: string;
  readonly blobStorageCdnProfileName: string;
  readonly blobStorageCdnEndpointName: string;
}

export const pulumiConfig: PulumiConfig = {
  location: config.require('location'),
  resourceGroupName: config.require('resourceGroupName'),
  cosmosDbDatabaseAccountName: config.require('cosmosDbDatabaseAccountName'),
  cosmosDbDatabaseName: config.require('cosmosDbDatabaseName'),
  cosmosDbContainerName: config.require('cosmosDbContainerName'),
  uploadFunctionsAppName: config.require('uploadFunctionsAppName'),
  publishFunctionsAppName: config.require('publishFunctionsAppName'),
  uploadsStorageAccountName: config.require('uploadsStorageAccountName'),
  uploadsContainerName: config.require('uploadsContainerName'),
  blobStorageAccountName: config.require('blobStorageAccountName'),
  homeBlobContainerName: config.require('homeBlobContainerName'),
  reviewBlobContainerName: config.require('reviewBlobContainerName'),
  reviewsBlobContainerName: config.require('reviewsBlobContainerName'),
  photoOfTheWeekBlobContainerName: config.require(
    'photoOfTheWeekBlobContainerName'
  ),
  storiesBlobContainerName: config.require('storiesBlobContainerName'),
  destinationsBlobContainerName: config.require(
    'destinationsBlobContainerName'
  ),
  blobStorageCdnProfileName: config.require('blobStorageCdnProfileName'),
  blobStorageCdnEndpointName: config.require('blobStorageCdnEndpointName'),
};
