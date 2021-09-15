import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import {
  AuthenticationService,
  AuthenticationMockService,
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
      provide: AuthenticationService,
      useClass: AuthenticationMockService,
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
