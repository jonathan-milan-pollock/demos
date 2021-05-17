import { join } from 'path';

import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { MongooseModule } from '@nestjs/mongoose';

import { environment } from '../environments/environment';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppServerModule } from './../../../website/src/main.server';
import { AuthModule } from './auth.module';
import { EnvModule } from './env.module';
import { ApiFeatureModule } from '@dark-rush-photography/api/feature';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/website/browser'),
    }),
    MongooseModule.forRoot(environment.mongoDbConnectionString),
    AuthModule,
    EnvModule,
    ApiFeatureModule,
  ],
  providers: [],
})
export class AppModule {}
