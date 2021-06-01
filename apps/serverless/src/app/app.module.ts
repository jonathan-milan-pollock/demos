import { Module } from '@nestjs/common';

import { ServerlessFeatureModule } from '@dark-rush-photography/serverless/feature';
import { EnvModule } from './env.module';

@Module({
  imports: [EnvModule, ServerlessFeatureModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
