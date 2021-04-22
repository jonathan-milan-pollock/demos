import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReviewsAdminComponent } from './reviews-admin/reviews-admin.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ReviewsAdminComponent },
    ]),
  ],
  declarations: [ReviewsAdminComponent],
})
export class WebsiteFeaturesReviewsAdminFeatureModule {}
