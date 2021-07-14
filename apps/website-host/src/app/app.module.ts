import { join } from 'path';

import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { AppServerModule } from '@dark-rush-photography/website/app';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/website/browser'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
