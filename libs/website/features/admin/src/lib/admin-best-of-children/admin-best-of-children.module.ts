import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminBestOfChildrenComponent } from './admin-best-of-children.component';
import { WebsiteUiUiAdminModule } from '@dark-rush-photography/website/ui/ui-admin';

@NgModule({
  declarations: [AdminBestOfChildrenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminBestOfChildrenComponent },
    ]),
    ReactiveFormsModule,
    WebsiteUiUiAdminModule,
  ],
})
export class AdminBestOfChildrenModule {}
