import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { environment } from '../environments/environment';
import { AuthModule } from './auth.module';
import { EnvModule } from './env.module';
import { ApiFeatureModule } from '@dark-rush-photography/api/feature';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongoDbConnectionString, {
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    AuthModule,
    EnvModule,
    ApiFeatureModule,
  ],
})
export class AppModule {}
