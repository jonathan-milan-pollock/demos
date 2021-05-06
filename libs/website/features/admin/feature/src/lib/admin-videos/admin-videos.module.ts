import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminVideosComponent } from './admin-videos.component';

@NgModule({
  declarations: [AdminVideosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminVideosComponent },
    ]),
    ReactiveFormsModule,
  ],
})
export class AdminVideosModule {}
