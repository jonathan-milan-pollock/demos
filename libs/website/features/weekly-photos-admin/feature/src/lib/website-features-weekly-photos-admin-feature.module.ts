import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { WeeklyPhotosAdminComponent } from './weekly-photos-admin/weekly-photos-admin.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: WeeklyPhotosAdminComponent },
    ]),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
  ],
  declarations: [WeeklyPhotosAdminComponent],
})
export class WebsiteFeaturesWeeklyPhotosAdminFeatureModule {}
