import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DestinationsComponent } from './destinations/destinations.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DestinationsComponent },
      {
        path: ':destination',
        loadChildren: () =>
          import(
            '@dark-rush-photography/website/features/destination/feature'
          ).then((module) => module.WebsiteFeaturesDestinationFeatureModule),
      },
    ]),
  ],
  declarations: [DestinationsComponent],
})
export class WebsiteFeaturesDestinationsFeatureModule {}
