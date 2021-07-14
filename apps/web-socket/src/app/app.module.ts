import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../config/configuration';
import { AuthModule } from './auth.module';
import { WebSocketFeatureModule } from '@dark-rush-photography/web-socket/feature';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    AuthModule,
    WebSocketFeatureModule,
  ],
})
export class AppModule {}
