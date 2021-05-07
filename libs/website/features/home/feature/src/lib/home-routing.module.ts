import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  MetaPhotoOfTheWeekImageResolver,
  MetaEventResolver,
  MetaDestinationResolver,
} from '@dark-rush-photography/website/data';

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
        path: 'reviews/review',
        loadChildren: () =>
          import('./review/review.module').then(
            (module) => module.ReviewModule
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
        path: 'photo-of-the-week/:slug',
        resolve: { metadata: MetaPhotoOfTheWeekImageResolver },
        loadChildren: () =>
          import(
            './photo-of-the-week-image/photo-of-the-week-image.module'
          ).then((module) => module.PhotoOfTheWeekImageModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./events/events.module').then(
            (module) => module.EventsModule
          ),
      },
      {
        path: 'events/:slug',
        resolve: { metadata: MetaEventResolver },
        loadChildren: () =>
          import('./event/event.module').then((module) => module.EventModule),
      },
      {
        path: 'events/:slug/:event-image',
        resolve: { metadata: MetaEventResolver },
        loadChildren: () =>
          import('./event-image/event-image.module').then(
            (module) => module.EventImageModule
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
        path: 'destinations/:slug',
        resolve: { metadata: MetaDestinationResolver },
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
