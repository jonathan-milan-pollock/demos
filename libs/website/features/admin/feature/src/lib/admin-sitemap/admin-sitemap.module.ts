import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { WebsiteUiFormGroupsModule } from '@dark-rush-photography/website/ui/ui-shared';

import { AdminSitemapComponent } from './admin-sitemap.component';

@NgModule({
  declarations: [AdminSitemapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminSitemapComponent },
    ]),
    ReactiveFormsModule,
    MatToolbarModule,
    WebsiteUiFormGroupsModule,
  ],
})
export class AdminSitemapModule {}
