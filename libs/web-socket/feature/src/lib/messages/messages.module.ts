import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';

@Module({
  providers: [MessagesGateway],
})
export class MessagesModule {}
