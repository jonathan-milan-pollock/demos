import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReviewsComponent,
        children: [
          {
            path: 'review',
            loadChildren: () =>
              import(
                '@dark-rush-photography/website/features/review/feature'
              ).then((module) => module.WebsiteFeaturesReviewFeatureModule),
          },
        ],
      },
    ]),
  ],
  declarations: [ReviewsComponent],
})
export class WebsiteFeaturesReviewsFeatureModule {}
