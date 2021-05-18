import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import {
  AuthModule,
  AuthHttpInterceptor,
  HttpMethod,
} from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';

import { environment } from '../environments/environment';
import { reviewReducer } from '@dark-rush-photography/website/data';
import { photoOfTheWeekReducer } from '@dark-rush-photography/website/data';
import { eventReducer } from '@dark-rush-photography/website/data';
import { destinationReducer } from '@dark-rush-photography/website/data';
import { Auth0AuthService } from '@dark-rush-photography/website/util';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WebsiteUiUiShellModule } from '@dark-rush-photography/website/ui/ui-shell';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      review: reviewReducer,
      photoOfTheWeek: photoOfTheWeekReducer,
      event: eventReducer,
      destination: destinationReducer,
    }),
    AuthModule.forRoot({
      domain: 'auth.darkrushphotography.com',
      clientId: 'itlDBOCejY2AxCCR4qNZRnI1AUwWb9O3',
      audience: 'https://www.darkrushphotography.com',
      httpInterceptor: {
        allowedList: ['http://localhost:4200/api/*'],
      },
    }),
    FontAwesomeModule,
    WebsiteUiUiShellModule,
    MatCardModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    Auth0AuthService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor() {
    config.autoAddCss = false;
  }
}
