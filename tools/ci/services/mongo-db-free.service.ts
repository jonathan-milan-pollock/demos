import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  DatabaseAccount,
  ServerVersion,
} from '@pulumi/azure-native/documentdb';

export const createFreeMongoDbAccount = (
  freeMongoDbAccountName: string,
  resourceGroup: ResourceGroup
) =>
  new DatabaseAccount(freeMongoDbAccountName, {
    accountName: freeMongoDbAccountName,
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
  });
