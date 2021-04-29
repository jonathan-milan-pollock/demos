import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReviewComponent } from './review.component';

@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ReviewComponent },
    ]),
  ],
})
export class ReviewModule {}
