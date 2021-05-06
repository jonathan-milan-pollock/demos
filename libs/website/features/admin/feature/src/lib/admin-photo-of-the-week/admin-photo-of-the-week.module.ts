import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { WebsiteUiUiAdminModule } from '@dark-rush-photography/website/ui/ui-admin';

import { AdminPhotoOfTheWeekComponent } from './admin-photo-of-the-week.component';

@NgModule({
  declarations: [AdminPhotoOfTheWeekComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminPhotoOfTheWeekComponent },
    ]),
    ReactiveFormsModule,
    WebsiteUiUiAdminModule,
  ],
})
export class AdminPhotoOfTheWeekModule {}
