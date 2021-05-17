import { Module } from '@nestjs/common';

import { EnvModule } from './env.module';
import { ServerlessFeatureModule } from '@dark-rush-photography/serverless/feature';

@Module({
  imports: [EnvModule, ServerlessFeatureModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
