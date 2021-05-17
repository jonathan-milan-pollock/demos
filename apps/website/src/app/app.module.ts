import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { environment } from '../environments/environment';
import { reviewReducer } from '@dark-rush-photography/website/data';
import { photoOfTheWeekReducer } from '@dark-rush-photography/website/data';
import { eventReducer } from '@dark-rush-photography/website/data';
import { destinationReducer } from '@dark-rush-photography/website/data';
import { WebsiteUiUiHomeModule } from '@dark-rush-photography/website/ui/ui-home';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

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
      ...environment.auth,
    }),
    FontAwesomeModule,
    WebsiteUiUiHomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
