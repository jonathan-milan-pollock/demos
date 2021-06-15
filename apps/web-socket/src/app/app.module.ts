import { Module } from '@nestjs/common';

import { WebSocketFeatureModule } from '@dark-rush-photography/web-socket/feature';

@Module({
  imports: [WebSocketFeatureModule],
})
export class AppModule {}
