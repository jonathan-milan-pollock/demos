import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  DatabaseAccount,
  ServerVersion,
  MongoDBResourceMongoDBDatabase,
  MongoDBResourceMongoDBCollection,
} from '@pulumi/azure-native/documentdb';

import { AzureMongoDbDatabaseAccount } from '../interfaces/azure-mongodb-database-account.interface';
import { AzureMongoDbDatabase } from '../interfaces/azure-mongodb-database.interface';
import { AzureMongoDbCollection } from '../interfaces/azure-mongodb-collection.interface';

export const createMongoDbAccount = (accountName: string) => (
  resourceGroup: ResourceGroup
): AzureMongoDbDatabaseAccount => ({
  resourceGroup,
  databaseAccount: new DatabaseAccount(accountName, {
    accountName,
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    kind: 'MongoDB',
    enableFreeTier: true,
    databaseAccountOfferType: 'Standard',
    backupPolicy: {
      periodicModeProperties: {
        backupIntervalInMinutes: 1440,
        backupRetentionIntervalInHours: 48,
      },
      type: 'Periodic',
    },
    locations: [
      {
        locationName: resourceGroup.location,
        failoverPriority: 0,
      },
    ],
    apiProperties: {
      serverVersion: ServerVersion.ServerVersion_4_0,
    },
  }),
});

export const createMongoDbDatabase = (databaseName: string) => (
  azureMongoDbDatabaseAccount: AzureMongoDbDatabaseAccount
): AzureMongoDbDatabase => ({
  ...azureMongoDbDatabaseAccount,
  database: new MongoDBResourceMongoDBDatabase(databaseName, {
    databaseName,
    accountName: azureMongoDbDatabaseAccount.databaseAccount.name,
    resourceGroupName: azureMongoDbDatabaseAccount.resourceGroup.name,
    location: azureMongoDbDatabaseAccount.resourceGroup.location,
    resource: {
      id: databaseName,
    },
  }),
});

export const createMongoDbCollectionWithTypeShardKey = (
  collectionName: string
) => (azureMongoDbDatabase: AzureMongoDbDatabase): AzureMongoDbCollection => ({
  ...azureMongoDbDatabase,
  collection: new MongoDBResourceMongoDBCollection(collectionName, {
    collectionName,
    databaseName: azureMongoDbDatabase.database.name,
    accountName: azureMongoDbDatabase.databaseAccount.name,
    resourceGroupName: azureMongoDbDatabase.resourceGroup.name,
    location: azureMongoDbDatabase.resourceGroup.location,
    resource: {
      id: collectionName,
      indexes: [
        {
          key: {
            keys: ['_id'],
          },
          options: {
            unique: true,
          },
        },
        {
          key: {
            keys: ['type'],
          },
          options: {
            unique: false,
          },
        },
      ],
      shardKey: {
        type: 'Hash',
      },
    },
  }),
});
