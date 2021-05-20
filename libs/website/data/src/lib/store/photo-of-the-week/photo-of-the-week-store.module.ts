import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromPhotoOfTheWeek from './photo-of-the-week.reducer';
import { PhotoOfTheWeekEffects } from './photo-of-the-week.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromPhotoOfTheWeek.photoOfTheWeekFeatureKey,
      fromPhotoOfTheWeek.photoOfTheWeekReducer
    ),
    EffectsModule.forFeature([PhotoOfTheWeekEffects]),
  ],
})
export class PhotoOfTheWeekStoreModule {}
