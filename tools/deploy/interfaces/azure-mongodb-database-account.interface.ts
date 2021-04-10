import { ResourceGroup } from '@pulumi/azure-native/resources';
import { DatabaseAccount } from '@pulumi/azure-native/documentdb';

export interface AzureMongoDbDatabaseAccount {
  readonly resourceGroup: ResourceGroup;
  readonly databaseAccount: DatabaseAccount;
}
