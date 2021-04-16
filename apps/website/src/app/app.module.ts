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
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
