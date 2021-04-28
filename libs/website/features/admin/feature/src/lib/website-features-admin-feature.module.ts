import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '@dark-rush-photography/website/util';
import { SaveChangesGuard } from '@dark-rush-photography/website/util';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        //canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: AdminPagesComponent,
          },
          {
            path: 'reviews',
            //canDeactivate: [SaveChangesGuard],
            loadChildren: () =>
              import(
                '@dark-rush-photography/website/features/reviews-admin/feature'
              ).then(
                (module) => module.WebsiteFeaturesReviewsAdminFeatureModule
              ),
          },
          {
            path: 'photo-of-the-week',
            // canDeactivate: [SaveChangesGuard],
            loadChildren: () =>
              import(
                '@dark-rush-photography/website/features/weekly-photos-admin/feature'
              ).then(
                (module) => module.WebsiteFeaturesWeeklyPhotosAdminFeatureModule
              ),
          },
          {
            path: 'stories',
            // canDeactivate: [SaveChangesGuard],
            loadChildren: () =>
              import(
                '@dark-rush-photography/website/features/stories-admin/feature'
              ).then(
                (module) => module.WebsiteFeaturesStoriesAdminFeatureModule
              ),
          },
          {
            path: 'destinations',
            // canDeactivate: [SaveChangesGuard],
            loadChildren: () =>
              import(
                '@dark-rush-photography/website/features/destinations-admin/feature'
              ).then(
                (module) => module.WebsiteFeaturesDestinationsAdminFeatureModule
              ),
          },
          {
            path: 'video',
            // canDeactivate: [SaveChangesGuard],
            loadChildren: () =>
              import(
                '@dark-rush-photography/website/features/video-admin/feature'
              ).then((module) => module.WebsiteFeaturesVideoAdminFeatureModule),
          },
        ],
      },
    ]),
  ],
  declarations: [AdminComponent, AdminPagesComponent],
})
export class WebsiteFeaturesAdminFeatureModule {}
