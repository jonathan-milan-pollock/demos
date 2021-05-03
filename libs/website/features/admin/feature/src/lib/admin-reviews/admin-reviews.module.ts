import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { WebsiteUiAdminModule } from '@dark-rush-photography/website/ui/ui-shared';

import { AdminReviewsComponent } from './admin-reviews.component';

@NgModule({
  declarations: [AdminReviewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminReviewsComponent },
    ]),
    ReactiveFormsModule,
    MatToolbarModule,
    WebsiteUiAdminModule,
  ],
})
export class AdminReviewsModule {}
