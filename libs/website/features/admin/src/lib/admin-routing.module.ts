import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Auth0AuthGuard } from '@dark-rush-photography/website/data';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin-pages/admin-pages.module').then(
            (module) => module.AdminPagesModule
          ),
      },
      {
        path: 'favorites',
        canActivate: [Auth0AuthGuard],
        //canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./admin-favorites/admin-favorites.module').then(
            (module) => module.AdminFavoritesModule
          ),
      },
      {
        path: 'reviews',
        canActivate: [Auth0AuthGuard],
        //canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./admin-reviews/admin-reviews.module').then(
            (module) => module.AdminReviewsModule
          ),
      },
      {
        path: 'photo-of-the-week',
        canActivate: [Auth0AuthGuard],
        //canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import(
            './admin-photo-of-the-week/admin-photo-of-the-week.module'
          ).then((module) => module.AdminPhotoOfTheWeekModule),
      },
      {
        path: 'events',
        canActivate: [Auth0AuthGuard],
        // canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./admin-events/admin-events.module').then(
            (module) => module.AdminEventsModule
          ),
      },
      {
        path: 'destinations',
        canActivate: [Auth0AuthGuard],
        // canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./admin-destinations/admin-destinations.module').then(
            (module) => module.AdminDestinationsModule
          ),
      },
      {
        path: 'best-of-events',
        canActivate: [Auth0AuthGuard],
        // canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./admin-best-of-events/admin-best-of-events.module').then(
            (module) => module.AdminBestOfEventsModule
          ),
      },
      {
        path: 'best-of-real-estate',
        canActivate: [Auth0AuthGuard],
        // canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import(
            './admin-best-of-real-estate/admin-best-of-real-estate.module'
          ).then((module) => module.AdminBestOfRealEstateModule),
      },
      {
        path: 'best-of-nature',
        canActivate: [Auth0AuthGuard],
        // canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./admin-best-of-nature/admin-best-of-nature.module').then(
            (module) => module.AdminBestOfNatureModule
          ),
      },
      {
        path: 'best-of-landscapes',
        canActivate: [Auth0AuthGuard],
        // canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import(
            './admin-best-of-landscapes/admin-best-of-landscapes.module'
          ).then((module) => module.AdminBestOfLandscapesModule),
      },
      {
        path: 'best-of-children',
        canActivate: [Auth0AuthGuard],
        // canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./admin-best-of-children/admin-best-of-children.module').then(
            (module) => module.AdminBestOfChildrenModule
          ),
      },
      {
        path: 'videos',
        canActivate: [Auth0AuthGuard],
        // canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./admin-videos/admin-videos.module').then(
            (module) => module.AdminVideosModule
          ),
      },
      {
        path: 'sitemap',
        canActivate: [Auth0AuthGuard],
        // canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./admin-sitemap/admin-sitemap.module').then(
            (module) => module.AdminSitemapModule
          ),
      },
      {
        path: 'settings',
        canActivate: [Auth0AuthGuard],
        // canDeactivate: [SaveChangesGuard],
        loadChildren: () =>
          import('./admin-settings/admin-settings.module').then(
            (module) => module.AdminSettingsModule
          ),
      },
      { path: '**', redirectTo: '/' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
