import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromReview from './review.reducer';
import { ReviewEffects } from './review.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromReview.reviewFeatureKey,
      fromReview.reviewReducer
    ),
    EffectsModule.forFeature([ReviewEffects]),
  ],
})
export class ReviewStoreModule {}
