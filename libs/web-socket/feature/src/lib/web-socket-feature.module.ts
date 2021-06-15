import { Module } from '@nestjs/common';

import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [MessagesModule],
})
export class WebSocketFeatureModule {}
