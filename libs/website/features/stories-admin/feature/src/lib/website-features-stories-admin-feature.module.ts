import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoriesAdminComponent } from './stories-admin/stories-admin.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: StoriesAdminComponent },
    ]),
  ],
  declarations: [StoriesAdminComponent],
})
export class WebsiteFeaturesStoriesAdminFeatureModule {}
