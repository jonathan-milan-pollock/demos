import { Global, Module } from '@nestjs/common';

import { WebSocketMessageProvider } from '@dark-rush-photography/api/data';

@Global()
@Module({
  providers: [WebSocketMessageProvider],
  exports: [WebSocketMessageProvider],
})
export class WebSocketMessageProviderModule {}
