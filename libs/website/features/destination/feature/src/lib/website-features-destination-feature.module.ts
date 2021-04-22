import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DestinationComponent } from './destination/destination.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DestinationComponent },
    ]),
  ],
  declarations: [DestinationComponent],
})
export class WebsiteFeaturesDestinationFeatureModule {}
