import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminReviewsComponent } from './admin-reviews.component';
import { WebsiteUiUiAdminModule } from '@dark-rush-photography/website/ui/ui-admin';

@NgModule({
  declarations: [AdminReviewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminReviewsComponent },
    ]),
    ReactiveFormsModule,
    WebsiteUiUiAdminModule,
  ],
})
export class AdminReviewsModule {}
