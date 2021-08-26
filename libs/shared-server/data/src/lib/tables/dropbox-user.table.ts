import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('DropboxUserID')
@EntityRowKey('DropboxUserEmail')
export class DropboxUserTable {
  @EntityString() email!: string;
  @EntityString() refreshToken!: string;
}
