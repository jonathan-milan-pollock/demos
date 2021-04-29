import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./admin-pages/admin-pages.module').then(
            (module) => module.AdminPagesModule
          ),
      },
      {
        path: 'reviews',
        //canActivate: [AuthGuard]
        //canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./reviews-admin/reviews-admin.module').then(
            (module) => module.ReviewsAdminModule
          ),
      },
      {
        path: 'photo-of-the-week',
        //canActivate: [AuthGuard]
        //canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import(
            './photo-of-the-week-admin/photo-of-the-week-admin.module'
          ).then((module) => module.PhotoOfTheWeekAdminModule),
      },
      {
        path: 'stories',
        // canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./stories-admin/stories-admin.module').then(
            (module) => module.StoriesAdminModule
          ),
      },
      {
        path: 'destinations',
        // canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./destinations-admin/destinations-admin.module').then(
            (module) => module.DestinationsAdminModule
          ),
      },
      {
        path: 'video',
        // canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./video-admin/video-admin.module').then(
            (module) => module.VideoAdminModule
          ),
      },
      {
        path: 'sitemap',
        // canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./sitemap-admin/sitemap-admin.module').then(
            (module) => module.SitemapAdminModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
