import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { WebsiteUiUiShellModule } from '@dark-rush-photography/website/ui/ui-shell';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@dark-rush-photography/website/features/home/feature').then(
              (module) => module.WebsiteFeaturesHomeFeatureModule
            ),
        },
        {
          path: 'about',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/about/feature'
            ).then((module) => module.WebsiteFeaturesAboutFeatureModule),
        },
        {
          path: 'admin',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/admin/feature'
            ).then((module) => module.WebsiteFeaturesAdminFeatureModule),
        },
        {
          path: 'reviews',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/reviews/feature'
            ).then((module) => module.WebsiteFeaturesReviewsFeatureModule),
        },
        {
          path: 'review',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/review/feature'
            ).then((module) => module.WebsiteFeaturesReviewFeatureModule),
        },
        {
          path: 'admin/reviews',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/reviews-admin/feature'
            ).then((module) => module.WebsiteFeaturesReviewsAdminFeatureModule),
        },
        {
          path: 'photo-of-the-week',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/weekly-photos/feature'
            ).then((module) => module.WebsiteFeaturesWeeklyPhotosFeatureModule),
        },
        {
          path: 'photo-of-the-week/:photo-of-the-week',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/weekly-photo/feature'
            ).then((module) => module.WebsiteFeaturesWeeklyPhotoFeatureModule),
        },
        {
          path: 'admin/photo-of-the-week',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/weekly-photos-admin/feature'
            ).then(
              (module) => module.WebsiteFeaturesWeeklyPhotosAdminFeatureModule
            ),
        },
        {
          path: 'stories',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/stories/feature'
            ).then((module) => module.WebsiteFeaturesStoriesFeatureModule),
        },
        {
          path: 'stories/:story',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/story/feature'
            ).then((module) => module.WebsiteFeaturesStoryFeatureModule),
        },
        {
          path: 'admin/stories',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/stories-admin/feature'
            ).then((module) => module.WebsiteFeaturesStoriesAdminFeatureModule),
        },
        {
          path: 'destinations/:destination',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/destination/feature'
            ).then((module) => module.WebsiteFeaturesDestinationFeatureModule),
        },
        {
          path: 'destinations',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/destinations/feature'
            ).then((module) => module.WebsiteFeaturesDestinationsFeatureModule),
        },
        {
          path: 'admin/destinations',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/destinations-admin/feature'
            ).then(
              (module) => module.WebsiteFeaturesDestinationsAdminFeatureModule
            ),
        },
        {
          path: 'admin/video',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/video-admin/feature'
            ).then((module) => module.WebsiteFeaturesVideoAdminFeatureModule),
        },
      ],
      { initialNavigation: 'enabled', preloadingStrategy: PreloadAllModules }
    ),
    BrowserAnimationsModule,
    FontAwesomeModule,
    WebsiteUiUiShellModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
