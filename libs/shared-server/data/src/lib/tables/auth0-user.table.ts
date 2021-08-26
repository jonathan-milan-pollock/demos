import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('Auth0UserID')
@EntityRowKey('Auth0UserEmail')
export class Auth0UserTable {
  @EntityString() email!: string;
  @EntityString() name!: string;
  @EntityString() image!: string;
}
