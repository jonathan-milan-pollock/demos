import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ReviewsComponent },
    ]),
  ],
  declarations: [ReviewsComponent],
})
export class WebsiteFeaturesReviewsFeatureModule {}
