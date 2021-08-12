import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('ClientsDropboxUserID')
@EntityRowKey('ClientsDropboxUserEmail')
export class ClientsDropboxUserTable {
  @EntityString() email!: string;
  @EntityString() refreshToken!: string;
}
