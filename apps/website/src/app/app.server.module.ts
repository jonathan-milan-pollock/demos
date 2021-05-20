import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import {
  Auth0AuthService,
  Auth0AuthServiceMock,
  DestinationsService,
  DestinationsServiceMock,
  ReviewsService,
  ReviewsServiceMock,
} from '@dark-rush-photography/website/data';
import { AppComponent } from './app.component';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: Auth0AuthService,
      useClass: Auth0AuthServiceMock,
    },
    {
      provide: DestinationsService,
      useClass: DestinationsServiceMock,
    },
    {
      provide: ReviewsService,
      useClass: ReviewsServiceMock,
    },
  ],
})
export class AppServerModule {}
