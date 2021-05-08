import { join } from 'path';

import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { MongooseModule } from '@nestjs/mongoose';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppServerModule } from './../../../website/src/main.server';

import { environment } from '../environments/environment';
import { ApiFeatureModule } from '@dark-rush-photography/api/feature';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/website/browser'),
    }),
    MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING),
    ApiFeatureModule,
  ],
})
export class AppModule {}
