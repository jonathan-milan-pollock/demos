import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WeeklyPhotoComponent } from './weekly-photo/weekly-photo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: WeeklyPhotoComponent },
    ]),
  ],
  declarations: [WeeklyPhotoComponent],
})
export class WebsiteFeaturesWeeklyPhotoFeatureModule {}
