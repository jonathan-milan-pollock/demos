import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VideoAdminComponent } from './video-admin/video-admin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: VideoAdminComponent },
    ]),
  ],
  declarations: [VideoAdminComponent],
})
export class WebsiteFeaturesVideoAdminFeatureModule {}
