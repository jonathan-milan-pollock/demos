import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { VideoAdminComponent } from './video-admin.component';

@NgModule({
  declarations: [VideoAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: VideoAdminComponent },
    ]),
  ],
})
export class VideoAdminModule {}
