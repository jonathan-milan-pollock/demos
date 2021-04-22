import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReviewComponent } from './review/review.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ReviewComponent },
    ]),
  ],
  declarations: [ReviewComponent],
})
export class WebsiteFeaturesReviewFeatureModule {}
