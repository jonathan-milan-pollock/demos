import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReviewsComponent } from './reviews.component';

@NgModule({
  declarations: [ReviewsComponent],
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
              import('../review/review.module').then(
                (module) => module.ReviewModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class ReviewsModule {}
