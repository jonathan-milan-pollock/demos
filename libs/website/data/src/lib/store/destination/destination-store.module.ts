import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromDestination from './destination.reducer';
import { DestinationEffects } from './destination.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromDestination.destinationFeatureKey,
      fromDestination.destinationReducer
    ),
    EffectsModule.forFeature([DestinationEffects]),
  ],
})
export class DestinationStoreModule {}
