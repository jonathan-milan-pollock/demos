import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SitemapAdminComponent } from './sitemap-admin.component';

@NgModule({
  declarations: [SitemapAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SitemapAdminComponent },
    ]),
  ],
})
export class SitemapAdminModule {}
