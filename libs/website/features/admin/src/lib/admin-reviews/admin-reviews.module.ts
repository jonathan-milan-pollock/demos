import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { AdminReviewsComponent } from './admin-reviews.component';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { OpenReviewDialogButtonComponent } from './open-review-dialog-button/open-review-dialog-button.component';
import { WebsiteUiUiAdminModule } from '@dark-rush-photography/website/ui/ui-admin';

@NgModule({
  declarations: [
    AdminReviewsComponent,
    ReviewDialogComponent,
    OpenReviewDialogButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminReviewsComponent },
    ]),
    ReactiveFormsModule,
    WebsiteUiUiAdminModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
  ],
})
export class AdminReviewsModule {}
