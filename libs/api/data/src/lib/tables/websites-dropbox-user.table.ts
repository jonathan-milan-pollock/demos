import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('WebsitesDropboxUserID')
@EntityRowKey('WebsitesDropboxUserEmail')
export class WebsitesDropboxUserTable {
  @EntityString() email!: string;
  @EntityString() refreshToken!: string;
}
