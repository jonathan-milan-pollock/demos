import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  DatabaseAccount,
  MongoDBResourceMongoDBDatabase,
} from '@pulumi/azure-native/documentdb';

export interface AzureMongoDbDatabase {
  readonly resourceGroup: ResourceGroup;
  readonly databaseAccount: DatabaseAccount;
  readonly database: MongoDBResourceMongoDBDatabase;
}
