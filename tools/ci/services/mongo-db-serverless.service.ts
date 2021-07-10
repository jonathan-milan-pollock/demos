import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  DatabaseAccount,
  ServerVersion,
} from '@pulumi/azure-native/documentdb';

export const createServerlessMongoDbAccount = (
  serverlessMongoDbAccountName: string,
  resourceGroup: ResourceGroup
) =>
  new DatabaseAccount(serverlessMongoDbAccountName, {
    accountName: serverlessMongoDbAccountName,
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    kind: 'MongoDB',
    capabilities: [
      {
        name: 'EnableServerless',
      },
    ],
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
