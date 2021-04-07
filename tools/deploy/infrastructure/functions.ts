import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  DatabaseAccount,
  SqlResourceSqlDatabase,
  SqlResourceSqlContainer,
} from '@pulumi/azure-native/documentdb';

export const createResourceGroup = (location: string) => (
  resourceGroupName: string
): ResourceGroup =>
  new ResourceGroup('resourceGroup', {
    resourceGroupName,
    location,
  });

export const createCosmosDbDatabaseAccount = (resourceGroup: ResourceGroup) => (
  accountName: string
): DatabaseAccount =>
  new DatabaseAccount('cosmosDbDatabaseAccount', {
    accountName: accountName,
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    databaseAccountOfferType: 'Standard',
    locations: [
      {
        locationName: resourceGroup.location,
        failoverPriority: 0,
      },
    ],
    capabilities: [
      {
        name: 'EnableServerless',
      },
    ],
  });

export const createCosmosDbDatabase = (databaseName: string) => (
  resourceGroup: ResourceGroup
) => (account: DatabaseAccount): SqlResourceSqlDatabase =>
  new SqlResourceSqlDatabase('cosmosDbDatabase', {
    databaseName: databaseName,
    accountName: account.name,
    resourceGroupName: resourceGroup.name,
    resource: {
      id: databaseName,
    },
  });

export const createCosmosDbContainer = (containerName: string) => (
  resourceGroup: ResourceGroup
) => (account: DatabaseAccount) => (
  database: SqlResourceSqlDatabase
): SqlResourceSqlContainer =>
  new SqlResourceSqlContainer('cosmosDbContainer', {
    containerName: containerName,
    resourceGroupName: resourceGroup.name,
    accountName: account.name,
    databaseName: database.name,
    resource: {
      id: containerName,
      partitionKey: {
        paths: ['/slugType'],
        kind: 'Hash',
      },
    },
  });
