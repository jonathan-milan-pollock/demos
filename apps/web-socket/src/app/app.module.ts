import { Module } from '@nestjs/common';

import { EnvModule } from './env.module';
import { WebSocketFeatureModule } from '@dark-rush-photography/web-socket/feature';

@Module({
  imports: [EnvModule, WebSocketFeatureModule],
})
export class AppModule {}
