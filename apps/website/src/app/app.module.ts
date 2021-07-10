import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';

import {
  Auth0AuthService,
  DestinationsService,
  ReviewsService,
  //ReviewsServiceMock,
} from '@dark-rush-photography/website/data';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//import { RootStoreModule } from './root-store.module';
import { WebsiteUiUiShellModule } from '@dark-rush-photography/website/ui/ui-shell';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  // AuthStoreModule,
  DestinationStoreModule,
  // EventStoreModule,
  // PhotoOfTheWeekStoreModule,
  ReviewStoreModule,
} from '@dark-rush-photography/website/data';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'auth.darkrushphotography.com',
      clientId: 'itlDBOCejY2AxCCR4qNZRnI1AUwWb9O3',
      audience: 'https://www.darkrushphotography.com',
      httpInterceptor: {
        allowedList: ['http://localhost:4200/api/admin/*'],
      },
    }),
    FontAwesomeModule,
    AppRoutingModule,
    //AuthStoreModule,
    DestinationStoreModule,
    //EventStoreModule,
    //PhotoOfTheWeekStoreModule,
    ReviewStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    WebsiteUiUiShellModule,
    MatCardModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    Auth0AuthService,
    DestinationsService,
    ReviewsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    config.autoAddCss = false;
  }
}
