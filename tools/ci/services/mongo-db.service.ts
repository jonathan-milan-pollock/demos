import { all, Output } from '@pulumi/pulumi';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  DatabaseAccount,
  MongoDBResourceMongoDBDatabase,
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

export const getMongoDbConnectionString = (
  mongoDbDatabaseName: string,
  resourceGroup: ResourceGroup,
  mongoDbAccount: DatabaseAccount
): Output<string> => {
  const connectionStrings = all([
    resourceGroup.name,
    mongoDbAccount.name,
  ]).apply(([resourceGroupName, accountName]) =>
    listDatabaseAccountConnectionStrings({ resourceGroupName, accountName })
  );
  return connectionStrings.apply((cs) => {
    const connectionString = cs.connectionStrings![0].connectionString;
    const connectionStringSegments = connectionString.split('?');
    return `${connectionStringSegments[0]}${mongoDbDatabaseName}?${connectionStringSegments[1]}`;
  });
};
