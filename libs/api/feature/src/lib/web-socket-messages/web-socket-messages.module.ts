import { Module } from '@nestjs/common';

import { WebSocketMessagesGateway } from './web-socket-messages.gateway';

@Module({
  providers: [WebSocketMessagesGateway],
})
export class WebSocketMessagesModule {}
