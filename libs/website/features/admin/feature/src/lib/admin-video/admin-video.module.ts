import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { WebsiteUiFormGroupsModule } from '@dark-rush-photography/website/ui/ui-shared';

import { AdminVideoComponent } from './admin-video.component';

@NgModule({
  declarations: [AdminVideoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminVideoComponent },
    ]),
    ReactiveFormsModule,
    MatToolbarModule,
    WebsiteUiFormGroupsModule,
  ],
})
export class AdminVideoModule {}
