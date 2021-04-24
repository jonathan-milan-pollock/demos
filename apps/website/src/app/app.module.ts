import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { WebsiteUiUiShellModule } from '@dark-rush-photography/website/ui/ui-shell';

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
          path: 'reviews/admin',
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
          path: 'photo-of-the-week/image',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/weekly-photo/feature'
            ).then((module) => module.WebsiteFeaturesWeeklyPhotoFeatureModule),
        },
        {
          path: 'photo-of-the-week/admin',
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
          path: 'story',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/story/feature'
            ).then((module) => module.WebsiteFeaturesStoryFeatureModule),
        },
        {
          path: 'stories/admin',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/stories-admin/feature'
            ).then((module) => module.WebsiteFeaturesStoriesAdminFeatureModule),
        },
        {
          path: 'destination',
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
          path: 'destinations/admin',
          loadChildren: () =>
            import(
              '@dark-rush-photography/website/features/destinations-admin/feature'
            ).then(
              (module) => module.WebsiteFeaturesDestinationsAdminFeatureModule
            ),
        },
      ],
      { initialNavigation: 'enabled' }
    ),
    BrowserAnimationsModule,
    FontAwesomeModule,
    WebsiteUiUiShellModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
