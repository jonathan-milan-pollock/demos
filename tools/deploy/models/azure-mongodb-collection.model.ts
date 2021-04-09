import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  DatabaseAccount,
  MongoDBResourceMongoDBDatabase,
  MongoDBResourceMongoDBCollection,
} from '@pulumi/azure-native/documentdb';

export interface AzureMongoDbCollection {
  readonly resourceGroup: ResourceGroup;
  readonly databaseAccount: DatabaseAccount;
  readonly database: MongoDBResourceMongoDBDatabase;
  readonly collection: MongoDBResourceMongoDBCollection;
}
