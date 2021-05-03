import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { WebsiteUiAdminModule } from '@dark-rush-photography/website/ui/ui-shared';

import { AdminPhotoOfTheWeekComponent } from './admin-photo-of-the-week.component';

@NgModule({
  declarations: [AdminPhotoOfTheWeekComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminPhotoOfTheWeekComponent },
    ]),
    ReactiveFormsModule,
    WebsiteUiAdminModule,
  ],
})
export class AdminPhotoOfTheWeekModule {}
