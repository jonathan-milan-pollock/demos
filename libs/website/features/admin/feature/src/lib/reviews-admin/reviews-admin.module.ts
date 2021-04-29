import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReviewsAdminComponent } from './reviews-admin.component';

@NgModule({
  declarations: [ReviewsAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ReviewsAdminComponent },
    ]),
  ],
})
export class ReviewsAdminModule {}
