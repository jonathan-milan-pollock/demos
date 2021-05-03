import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { AdminPageButtonComponent } from './admin-page-button/admin-page-button.component';
import { AdminPhotoOfTheWeekFormComponent } from './admin-photo-of-the-week-form/admin-photo-of-the-week-form.component';
import { AdminReviewsFormComponent } from './admin-reviews-form/admin-reviews-form.component';
import { WebsiteUiFormGroupsModule } from './website-ui-form-groups.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    WebsiteUiFormGroupsModule,
  ],
  declarations: [
    AdminPageButtonComponent,
    AdminReviewsFormComponent,
    AdminPhotoOfTheWeekFormComponent,
  ],
  exports: [
    AdminPageButtonComponent,
    AdminReviewsFormComponent,
    AdminPhotoOfTheWeekFormComponent,
  ],
})
export class WebsiteUiAdminModule {}
