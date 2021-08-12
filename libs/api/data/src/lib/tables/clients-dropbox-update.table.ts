import {
  EntityBoolean,
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('ClientsDropboxUpdateID')
@EntityRowKey('ClientsDropboxUpdateKey')
export class ClientsDropboxUpdateTable {
  @EntityString() key!: string;
  @EntityBoolean() isUpdate!: boolean;
}
