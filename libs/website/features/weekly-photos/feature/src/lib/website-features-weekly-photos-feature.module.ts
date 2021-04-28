import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WeeklyPhotosComponent } from './weekly-photos/weekly-photos.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: WeeklyPhotosComponent,
        children: [
          {
            path: ':photo-of-the-week',
            loadChildren: () =>
              import(
                '@dark-rush-photography/website/features/weekly-photo/feature'
              ).then(
                (module) => module.WebsiteFeaturesWeeklyPhotoFeatureModule
              ),
          },
        ],
      },
    ]),
  ],
  declarations: [WeeklyPhotosComponent],
})
export class WebsiteFeaturesWeeklyPhotosFeatureModule {}
