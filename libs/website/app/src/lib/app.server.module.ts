import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import {
  EntitiesServerService,
  EntitiesService,
  LocalStorageServerService,
  LocalStorageService,
} from '@dark-rush-photography/website/data';
import { AppComponent } from './app/app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: LocalStorageService,
      useClass: LocalStorageServerService,
    },
    {
      provide: EntitiesService,
      useClass: EntitiesServerService,
    },
  ],
})
export class AppServerModule {}
