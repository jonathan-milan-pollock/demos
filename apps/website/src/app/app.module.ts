import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { reviewReducer } from '@dark-rush-photography/website/data';
import { photoOfTheWeekReducer } from '@dark-rush-photography/website/data';
import { eventReducer } from '@dark-rush-photography/website/data';
import { destinationReducer } from '@dark-rush-photography/website/data';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    StoreModule.forRoot({
      review: reviewReducer,
      photoOfTheWeek: photoOfTheWeekReducer,
      event: eventReducer,
      destination: destinationReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
