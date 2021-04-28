import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SitemapAdminComponent } from './sitemap-admin/sitemap-admin.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [SitemapAdminComponent],
})
export class WebsiteFeaturesSitemapAdminFeatureModule {}
