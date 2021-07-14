import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { HandleMessageProvider } from '@dark-rush-photography/web-socket/data';
import { MessagesGateway } from './messages.gateway';

@Module({
  imports: [HttpModule],
  providers: [HandleMessageProvider, MessagesGateway],
})
export class MessagesModule {}
