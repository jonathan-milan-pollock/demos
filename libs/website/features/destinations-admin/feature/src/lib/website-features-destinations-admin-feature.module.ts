import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DestinationsAdminComponent } from './destinations-admin/destinations-admin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DestinationsAdminComponent },
    ]),
  ],
  declarations: [DestinationsAdminComponent],
})
export class WebsiteFeaturesDestinationsAdminFeatureModule {}
