import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { WebsiteUiShellModule } from '@dark-rush-photography/website/ui-shell';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@dark-rush-photography/website/home/feature').then(
              (module) => module.WebsiteHomeFeatureModule
            ),
        },
        {
          path: 'photo-of-the-week',
          loadChildren: () =>
            import('@dark-rush-photography/website/weekly-photos/feature').then(
              (module) => module.WebsiteWeeklyPhotosFeatureModule
            ),
        },
        {
          path: 'photo-of-the-week/image',
          loadChildren: () =>
            import('@dark-rush-photography/website/weekly-photo/feature').then(
              (module) => module.WebsiteWeeklyPhotoFeatureModule
            ),
        },
        {
          path: 'stories',
          loadChildren: () =>
            import('@dark-rush-photography/website/stories/feature').then(
              (module) => module.WebsiteStoriesFeatureModule
            ),
        },
        {
          path: 'story',
          loadChildren: () =>
            import('@dark-rush-photography/website/story/feature').then(
              (module) => module.WebsiteStoryFeatureModule
            ),
        },
        {
          path: 'destinations',
          loadChildren: () =>
            import('@dark-rush-photography/website/destinations/feature').then(
              (module) => module.WebsiteDestinationsFeatureModule
            ),
        },
        {
          path: 'destination',
          loadChildren: () =>
            import('@dark-rush-photography/website/destination/feature').then(
              (module) => module.WebsiteDestinationFeatureModule
            ),
        },
        {
          path: 'reviews',
          loadChildren: () =>
            import('@dark-rush-photography/website/reviews/feature').then(
              (module) => module.WebsiteReviewsFeatureModule
            ),
        },
        {
          path: 'review',
          loadChildren: () =>
            import('@dark-rush-photography/website/review/feature').then(
              (module) => module.WebsiteReviewFeatureModule
            ),
        },
        {
          path: 'about',
          loadChildren: () =>
            import('@dark-rush-photography/website/about/feature').then(
              (module) => module.WebsiteAboutFeatureModule
            ),
        },
        {
          path: 'photo-of-the-week/admin',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/weekly-photos-admin/feature'
            ).then((module) => module.WebsiteWeeklyPhotosAdminFeatureModule),
        },
        {
          path: 'stories/admin',
          loadChildren: () =>
            import('@dark-rush-photography/website/stories-admin/feature').then(
              (module) => module.WebsiteStoriesAdminFeatureModule
            ),
        },
        {
          path: 'destinations/admin',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/destinations-admin/feature'
            ).then((module) => module.WebsiteDestinationsAdminFeatureModule),
        },
        {
          path: 'reviews/admin',
          loadChildren: () =>
            import('@dark-rush-photography/website/reviews-admin/feature').then(
              (module) => module.WebsiteReviewsAdminFeatureModule
            ),
        },
        {
          path: 'website-features-about-feature',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/about/feature'
            ).then((module) => module.WebsiteFeaturesAboutFeatureModule),
        },
        {
          path: 'website-features-destination-feature',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/destination/feature'
            ).then((module) => module.WebsiteFeaturesDestinationFeatureModule),
        },
        {
          path: 'website-features-destinations-feature',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/destinations/feature'
            ).then((module) => module.WebsiteFeaturesDestinationsFeatureModule),
        },
        {
          path: 'website-features-destinations-admin-feature',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/destinations-admin/feature'
            ).then(
              (module) => module.WebsiteFeaturesDestinationsAdminFeatureModule
            ),
        },
        {
          path: 'website-features-home-feature',
          loadChildren: () =>
            import('@dark-rush-photography/website/features/home/feature').then(
              (module) => module.WebsiteFeaturesHomeFeatureModule
            ),
        },
        {
          path: 'website-features-review-feature',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/review/feature'
            ).then((module) => module.WebsiteFeaturesReviewFeatureModule),
        },
        {
          path: 'website-features-reviews-feature',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/reviews/feature'
            ).then((module) => module.WebsiteFeaturesReviewsFeatureModule),
        },
        {
          path: 'website-features-reviews-admin-feature',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/reviews-admin/feature'
            ).then((module) => module.WebsiteFeaturesReviewsAdminFeatureModule),
        },
        {
          path: 'website-features-stories-feature',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/stories/feature'
            ).then((module) => module.WebsiteFeaturesStoriesFeatureModule),
        },
        {
          path: 'website-features-stories-admin-feature',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/stories-admin/feature'
            ).then((module) => module.WebsiteFeaturesStoriesAdminFeatureModule),
        },
        {
          path: 'website-features-story-feature',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/story/feature'
            ).then((module) => module.WebsiteFeaturesStoryFeatureModule),
        },
        {
          path: 'website-features-weekly-photo-feature',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/weekly-photo/feature'
            ).then((module) => module.WebsiteFeaturesWeeklyPhotoFeatureModule),
        },
        {
          path: 'website-features-weekly-photos-feature',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/weekly-photos/feature'
            ).then((module) => module.WebsiteFeaturesWeeklyPhotosFeatureModule),
        },
        {
          path: 'website-features-weekly-photos-admin-feature',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/weekly-photos-admin/feature'
            ).then(
              (module) => module.WebsiteFeaturesWeeklyPhotosAdminFeatureModule
            ),
        },
      ],
      { initialNavigation: 'enabled' }
    ),
    BrowserAnimationsModule,
    WebsiteUiShellModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
