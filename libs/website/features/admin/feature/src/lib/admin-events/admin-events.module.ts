import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { WebsiteUiFormGroupsModule } from '@dark-rush-photography/website/ui/ui-shared';

import { AdminEventsComponent } from './admin-events.component';

@NgModule({
  declarations: [AdminEventsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminEventsComponent },
    ]),
    ReactiveFormsModule,
    MatToolbarModule,
    WebsiteUiFormGroupsModule,
  ],
})
export class AdminEventsModule {}
