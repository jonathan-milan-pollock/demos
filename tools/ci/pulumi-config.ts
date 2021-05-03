import { Config } from '@pulumi/pulumi';

const config = new Config();

interface PulumiConfig {
  readonly location: string;
  readonly resourceGroupName: string;
  readonly mongoDbAccountName: string;
  readonly mongoDbDatabaseName: string;
  readonly mongoDbCollectionName: string;
  readonly uploadsStorageAccountName: string;
  readonly uploadsBlobContainerName: string;
  readonly contentStorageAccountName: string;
  readonly contentBlobContainerName: string;
  readonly contentCdnProfileName: string;
  readonly contentCdnEndpointName: string;
  readonly serverlessStorageAccountName: string;
  readonly serverlessBlobContainerName: string;
  readonly serverlessBlobName: string;
  readonly serverlessAppName: string;
}

const getConfigValue = (configName: string) => config.require(configName);

export const pulumiConfig: PulumiConfig = {
  location: getConfigValue('location'),
  resourceGroupName: getConfigValue('resourceGroupName'),
  mongoDbAccountName: getConfigValue('mongoDbAccountName'),
  mongoDbDatabaseName: getConfigValue('mongoDbDatabaseName'),
  mongoDbCollectionName: getConfigValue('mongoDbCollectionName'),
  uploadsStorageAccountName: getConfigValue('uploadsStorageAccountName'),
  uploadsBlobContainerName: getConfigValue('uploadsBlobContainerName'),
  contentStorageAccountName: getConfigValue('contentStorageAccountName'),
  contentBlobContainerName: getConfigValue('contentBlobContainerName'),
  contentCdnProfileName: getConfigValue('contentCdnProfileName'),
  contentCdnEndpointName: getConfigValue('contentCdnEndpointName'),
  serverlessStorageAccountName: getConfigValue('serverlessStorageAccountName'),
  serverlessBlobContainerName: getConfigValue('serverlessBlobContainerName'),
  serverlessBlobName: getConfigValue('serverlessBlobName'),
  serverlessAppName: getConfigValue('serverlessAppName'),
};
