import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
//import { TransferHttpCacheModule } from '@nguniversal/common';
//import { ServiceWorkerModule } from '@angular/service-worker';

//import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-home').then(
              (module) => module.WebsiteFeatureHomeModule
            ),
        },
        {
          path: 'photo-of-the-week',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-weekly-photos').then(
              (module) => module.WebsiteFeatureWeeklyPhotosModule
            ),
        },
        {
          path: 'photo-of-the-week/image',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-weekly-photo').then(
              (module) => module.WebsiteFeatureWeeklyPhotoModule
            ),
        },
        {
          path: 'stories',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-stories').then(
              (module) => module.WebsiteFeatureStoriesModule
            ),
        },
        {
          path: 'story',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-story').then(
              (module) => module.WebsiteFeatureStoryModule
            ),
        },
        {
          path: 'destinations',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-destinations').then(
              (module) => module.WebsiteFeatureDestinationsModule
            ),
        },
        {
          path: 'destination',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-destination').then(
              (module) => module.WebsiteFeatureDestinationModule
            ),
        },
        {
          path: 'reviews',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-reviews').then(
              (module) => module.WebsiteFeatureReviewsModule
            ),
        },
        {
          path: 'review',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-review').then(
              (module) => module.WebsiteFeatureReviewModule
            ),
        },
        {
          path: 'about',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-about').then(
              (module) => module.WebsiteFeatureAboutModule
            ),
        },
        {
          path: 'photo-of-the-week/admin',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/feature-weekly-photos-admin'
            ).then((module) => module.WebsiteFeatureWeeklyPhotosAdminModule),
        },
        {
          path: 'stories/admin',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-stories-admin').then(
              (module) => module.WebsiteFeatureStoriesAdminModule
            ),
        },
        {
          path: 'destinations/admin',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/feature-destinations-admin'
            ).then((module) => module.WebsiteFeatureDestinationsAdminModule),
        },
        {
          path: 'reviews/admin',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-reviews-admin').then(
              (module) => module.WebsiteFeatureReviewsAdminModule
            ),
        },
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

/*
   ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),


*/
