import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { WebsiteUiFormGroupsModule } from '@dark-rush-photography/website/ui/ui-shared';

import { AdminSettingsComponent } from './admin-settings.component';

@NgModule({
  declarations: [AdminSettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminSettingsComponent },
    ]),
    ReactiveFormsModule,
    MatToolbarModule,
    WebsiteUiFormGroupsModule,
  ],
})
export class AdminSettingsModule {}
