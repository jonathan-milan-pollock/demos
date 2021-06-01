import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminBestOfEventsComponent } from './admin-best-of-events.component';
import { WebsiteUiUiAdminModule } from '@dark-rush-photography/website/ui/ui-admin';

@NgModule({
  declarations: [AdminBestOfEventsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminBestOfEventsComponent },
    ]),
    ReactiveFormsModule,
    WebsiteUiUiAdminModule,
  ],
})
export class AdminBestOfEventsModule {}
