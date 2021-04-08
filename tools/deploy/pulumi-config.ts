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
  readonly serverlessFunctionsStorageAccountName: string;
  readonly serverlessFunctionsBlobContainerName: string;
  readonly serverlessFunctionsBlobName: string;
  readonly serverlessFunctionsAppName: string;
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
  serverlessFunctionsStorageAccountName: getConfigValue(
    'serverlessFunctionsStorageAccountName'
  ),
  serverlessFunctionsBlobContainerName: getConfigValue(
    'serverlessFunctionsBlobContainerName'
  ),
  serverlessFunctionsBlobName: getConfigValue('serverlessFunctionsBlobName'),
  serverlessFunctionsAppName: getConfigValue('serverlessFunctionsAppName'),
};
