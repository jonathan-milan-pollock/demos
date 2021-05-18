import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import {
  Auth0AuthService,
  MockAuth0AuthService,
} from '@dark-rush-photography/website/util';
import { AppComponent } from './app.component';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: Auth0AuthService,
      useClass: MockAuth0AuthService,
    },
  ],
})
export class AppServerModule {}
