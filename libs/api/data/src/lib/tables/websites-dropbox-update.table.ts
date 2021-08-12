import {
  EntityBoolean,
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('WebsitesDropboxUpdateID')
@EntityRowKey('WebsitesDropboxUpdateKey')
export class WebsitesDropboxUpdateTable {
  @EntityString() key!: string;
  @EntityBoolean() isUpdate!: boolean;
}
