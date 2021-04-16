import { join } from 'path';

import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppServerModule } from './../../../website/src/main.server';

import { ApiFeatureModule } from '@dark-rush-photography/api/feature';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/website/browser'),
    }),
    ApiFeatureModule,
  ],
})
export class AppModule {}
