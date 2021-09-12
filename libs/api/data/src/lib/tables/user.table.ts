import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('UserID')
@EntityRowKey('UserEmail')
export class UserTable {
  @EntityString() email!: string;
  @EntityString() name!: string;
  @EntityString() image!: string;
}
