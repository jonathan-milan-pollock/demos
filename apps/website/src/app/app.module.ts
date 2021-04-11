import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(
      [
        {
          path: 'website-feature-about',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-about').then(
              (module) => module.WebsiteFeatureAboutModule
            ),
        },
        {
          path: 'website-feature-destination',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-destination').then(
              (module) => module.WebsiteFeatureDestinationModule
            ),
        },
        {
          path: 'website-feature-destinations-admin',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/feature-destinations-admin'
            ).then((module) => module.WebsiteFeatureDestinationsAdminModule),
        },
        {
          path: 'website-feature-destinations',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-destinations').then(
              (module) => module.WebsiteFeatureDestinationsModule
            ),
        },
        {
          path: 'website-feature-home',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-home').then(
              (module) => module.WebsiteFeatureHomeModule
            ),
        },
        {
          path: 'website-feature-review',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-review').then(
              (module) => module.WebsiteFeatureReviewModule
            ),
        },
        {
          path: 'website-feature-reviews',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-reviews').then(
              (module) => module.WebsiteFeatureReviewsModule
            ),
        },
        {
          path: 'website-feature-reviews-admin',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-reviews-admin').then(
              (module) => module.WebsiteFeatureReviewsAdminModule
            ),
        },
        {
          path: 'website-feature-stories',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-stories').then(
              (module) => module.WebsiteFeatureStoriesModule
            ),
        },
        {
          path: 'website-feature-stories-admin',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-stories-admin').then(
              (module) => module.WebsiteFeatureStoriesAdminModule
            ),
        },
        {
          path: 'website-feature-story',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-story').then(
              (module) => module.WebsiteFeatureStoryModule
            ),
        },
        {
          path: 'website-feature-weekly-photo',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-weekly-photo').then(
              (module) => module.WebsiteFeatureWeeklyPhotoModule
            ),
        },
        {
          path: 'website-feature-weekly-photos',
          loadChildren: () =>
            import('@dark-rush-photography/website/feature-weekly-photos').then(
              (module) => module.WebsiteFeatureWeeklyPhotosModule
            ),
        },
        {
          path: 'website-feature-weekly-photos-admin',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/feature-weekly-photos-admin'
            ).then((module) => module.WebsiteFeatureWeeklyPhotosAdminModule),
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
