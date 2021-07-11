import { all, Output } from '@pulumi/pulumi';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  DatabaseAccount,
  MongoDBResourceMongoDBDatabase,
  MongoDBResourceMongoDBCollection,
  listDatabaseAccountConnectionStrings,
} from '@pulumi/azure-native/documentdb';

export const createMongoDb = (
  mongoDbDatabaseName: string,
  resourceGroup: ResourceGroup,
  mongoDbAccount: DatabaseAccount
): MongoDBResourceMongoDBDatabase =>
  new MongoDBResourceMongoDBDatabase(mongoDbDatabaseName, {
    databaseName: mongoDbDatabaseName,
    accountName: mongoDbAccount.name,
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    resource: {
      id: mongoDbDatabaseName,
    },
  });

export const createMongoDbCollection = (
  mongoDbCollectionName: string,
  resourceGroup: ResourceGroup,
  mongoDbAccount: DatabaseAccount,
  mongoDbDatabase: MongoDBResourceMongoDBDatabase
): MongoDBResourceMongoDBCollection =>
  new MongoDBResourceMongoDBCollection(mongoDbCollectionName, {
    collectionName: mongoDbCollectionName,
    databaseName: mongoDbDatabase.name,
    accountName: mongoDbAccount.name,
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    resource: {
      id: mongoDbCollectionName,
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
  });

export const getConnectionString = (
  resourceGroup: ResourceGroup,
  mongoDbAccount: DatabaseAccount
): Output<string> => {
  const connectionStrings = all([
    resourceGroup.name,
    mongoDbAccount.name,
  ]).apply(([resourceGroupName, accountName]) =>
    listDatabaseAccountConnectionStrings({ resourceGroupName, accountName })
  );
  return connectionStrings.apply(
    (cs) => cs.connectionStrings![0].connectionString
  );
};
