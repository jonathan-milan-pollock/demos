import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home-images/home-images.module').then(
            (module) => module.HomeImagesModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((module) => module.AboutModule),
      },
      {
        path: 'reviews',
        loadChildren: () =>
          import('./reviews/reviews.module').then(
            (module) => module.ReviewsModule
          ),
      },
      {
        path: 'photo-of-the-week',
        loadChildren: () =>
          import('./photo-of-the-week/photo-of-the-week.module').then(
            (module) => module.PhotoOfTheWeekModule
          ),
      },
      {
        path: 'photo-of-the-week/:photo-of-the-week',
        loadChildren: () =>
          import(
            './photo-of-the-week-image/photo-of-the-week-image.module'
          ).then((module) => module.PhotoOfTheWeekImageModule),
      },
      {
        path: 'stories',
        loadChildren: () =>
          import('./stories/stories.module').then(
            (module) => module.StoriesModule
          ),
      },
      {
        path: 'stories/:story',
        loadChildren: () =>
          import('./story/story.module').then((module) => module.StoryModule),
      },
      {
        path: 'stories/:story/:story-image',
        loadChildren: () =>
          import('./story-image/story-image.module').then(
            (module) => module.StoryImageModule
          ),
      },
      {
        path: 'destinations',
        loadChildren: () =>
          import('./destinations/destinations.module').then(
            (module) => module.DestinationsModule
          ),
      },
      {
        path: 'destinations/:destination',
        loadChildren: () =>
          import('./destination/destination.module').then(
            (module) => module.DestinationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
