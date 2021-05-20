import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminPagesComponent } from './admin-pages.component';
import { WebsiteUiUiCommonModule } from '@dark-rush-photography/website/ui/ui-common';

@NgModule({
  declarations: [AdminPagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminPagesComponent },
    ]),
    WebsiteUiUiCommonModule,
  ],
})
export class AdminPagesModule {}
