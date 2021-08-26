import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ServerlessFeatureModule } from '@dark-rush-photography/serverless/feature';
import configuration from '../config/configuration';
import { ConfigProviderModule } from './config-provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    ConfigProviderModule,
    ServerlessFeatureModule,
  ],
})
export class AppModule {}
