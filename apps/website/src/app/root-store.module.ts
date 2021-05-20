import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  AuthStoreModule,
  DestinationStoreModule,
  EventStoreModule,
  PhotoOfTheWeekStoreModule,
  ReviewStoreModule,
} from '@dark-rush-photography/website/data';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AuthStoreModule,
    DestinationStoreModule,
    EventStoreModule,
    PhotoOfTheWeekStoreModule,
    ReviewStoreModule,
  ],
  exports: [
    StoreModule,
    EffectsModule,
    AuthStoreModule,
    DestinationStoreModule,
    EventStoreModule,
    PhotoOfTheWeekStoreModule,
    ReviewStoreModule,
  ],
})
export class RootStoreModule {}
