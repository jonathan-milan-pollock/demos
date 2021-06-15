import { Module, HttpModule } from '@nestjs/common';

import { HandleMessageProvider } from '@dark-rush-photography/web-socket/data';
import { MessagesGateway } from './messages.gateway';

@Module({
  imports: [HttpModule],
  providers: [HandleMessageProvider, MessagesGateway],
})
export class MessagesModule {}
