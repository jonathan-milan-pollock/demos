import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  entitiesFeatureKey,
  entitiesReducer,
} from '@dark-rush-photography/website/data';

@NgModule({
  imports: [
    StoreModule.forRoot({
      [entitiesFeatureKey]: entitiesReducer,
    }),
    EffectsModule.forRoot([]),
  ],
})
export class AppStoreModule {}
