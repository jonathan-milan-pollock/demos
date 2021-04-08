import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  DatabaseAccount,
  ServerVersion,
  MongoDBResourceMongoDBDatabase,
  MongoDBResourceMongoDBCollection,
} from '@pulumi/azure-native/documentdb';

export const createMongoDbAccount = (accountName: string) => (
  resourceGroup: ResourceGroup
): [ResourceGroup, DatabaseAccount] => [
  resourceGroup,
  new DatabaseAccount(accountName, {
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
];

export const createMongoDbDatabase = (databaseName: string) => (
  mongoDb: [ResourceGroup, DatabaseAccount]
): [ResourceGroup, DatabaseAccount, MongoDBResourceMongoDBDatabase] => {
  const [resourceGroup, account] = mongoDb;

  return [
    resourceGroup,
    account,
    new MongoDBResourceMongoDBDatabase(databaseName, {
      databaseName,
      accountName: account.name,
      resourceGroupName: resourceGroup.name,
      location: resourceGroup.location,
      resource: {
        id: databaseName,
      },
    }),
  ];
};

export const createMongoDbCollection = (collectionName: string) => (
  shardKey: string
) => (
  mongoDb: [ResourceGroup, DatabaseAccount, MongoDBResourceMongoDBDatabase]
): [
  ResourceGroup,
  DatabaseAccount,
  MongoDBResourceMongoDBDatabase,
  MongoDBResourceMongoDBCollection
] => {
  const [resourceGroup, account, database] = mongoDb;

  return [
    resourceGroup,
    account,
    database,
    new MongoDBResourceMongoDBCollection(collectionName, {
      collectionName,
      databaseName: database.name,
      accountName: account.name,
      resourceGroupName: resourceGroup.name,
      location: resourceGroup.location,
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
              keys: [shardKey],
            },
            options: {
              unique: false,
            },
          },
        ],
        shardKey: {
          slugType: 'Hash',
        },
      },
    }),
  ];
};
