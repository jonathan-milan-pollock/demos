import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromEvent from './event.reducer';
import { EventEffects } from './event.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(fromEvent.eventFeatureKey, fromEvent.eventReducer),
    EffectsModule.forFeature([EventEffects]),
  ],
})
export class EventStoreModule {}
