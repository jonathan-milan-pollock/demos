import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('WebSocketMessageID')
@EntityRowKey('WebSocketMessageName')
export class WebSocketMessageTable {
  @EntityString() key!: string;
  @EntityString() message!: string;
}
