import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppServerModule } from './../../../admin-website/src/app/app.server.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/admin-website/browser'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
