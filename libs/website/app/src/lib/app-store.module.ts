import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  AuthenticationEffects,
  authenticationFeatureKey,
  authenticationReducer,
  imagePostFeatureKey,
  imagePostReducer,
} from '@dark-rush-photography/website/data';

@NgModule({
  imports: [
    StoreModule.forRoot({
      [authenticationFeatureKey]: authenticationReducer,
      //[destinationFeatureKey]: DestinationState,
      //[eventFeatureKey]: EventState,
      [imagePostFeatureKey]: imagePostReducer,
      //[photoOfTheWeekFeatureKey]: PhotoOfTheWeekState,
      //[reviewFeatureKey]: reviewReducer,
    }),
    EffectsModule.forRoot([AuthenticationEffects]),
  ],
})
export class AppStoreModule {}
