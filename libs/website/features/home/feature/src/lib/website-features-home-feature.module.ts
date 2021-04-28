import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeImagesComponent } from './home-images/home-images.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            component: HomeImagesComponent,
          },
          {
            path: 'photo-of-the-week',
            loadChildren: () =>
              import(
                '@dark-rush-photography/website/features/weekly-photos/feature'
              ).then(
                (module) => module.WebsiteFeaturesWeeklyPhotosFeatureModule
              ),
          },
          {
            path: 'stories',
            loadChildren: () =>
              import(
                '@dark-rush-photography/website/features/stories/feature'
              ).then((module) => module.WebsiteFeaturesStoriesFeatureModule),
          },
          {
            path: 'destinations',
            loadChildren: () =>
              import(
                '@dark-rush-photography/website/features/destinations/feature'
              ).then(
                (module) => module.WebsiteFeaturesDestinationsFeatureModule
              ),
          },
        ],
      },
    ]),
  ],
  declarations: [HomeComponent, HomeImagesComponent],
})
export class WebsiteFeaturesHomeFeatureModule {}
