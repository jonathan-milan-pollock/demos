import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WeeklyPhotosAdminComponent } from './weekly-photos-admin/weekly-photos-admin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: WeeklyPhotosAdminComponent },
    ]),
  ],
  declarations: [WeeklyPhotosAdminComponent],
})
export class WebsiteFeaturesWeeklyPhotosAdminFeatureModule {}
