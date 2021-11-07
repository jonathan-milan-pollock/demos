import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  FindAllEntitiesResolver,
  FindOneEntityResolver,
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
        resolve: { metadata: FindAllEntitiesResolver },
        loadChildren: () =>
          import('./about/about.module').then((module) => module.AboutModule),
      },
      {
        path: 'reviews',
        resolve: { metadata: FindAllEntitiesResolver },
        loadChildren: () =>
          import('./reviews/reviews.module').then(
            (module) => module.ReviewsModule
          ),
      },
      {
        path: 'reviews/review',
        resolve: { metadata: FindAllEntitiesResolver },
        loadChildren: () =>
          import('./review/review.module').then(
            (module) => module.ReviewModule
          ),
      },
      {
        path: 'photo-of-the-week',
        resolve: { metadata: FindAllEntitiesResolver },
        loadChildren: () =>
          import('./photo-of-the-week/photo-of-the-week.module').then(
            (module) => module.PhotoOfTheWeekModule
          ),
      },
      {
        path: 'photo-of-the-week/:slug',
        resolve: { metadata: FindOneEntityResolver },
        loadChildren: () =>
          import(
            './photo-of-the-week-image/photo-of-the-week-image.module'
          ).then((module) => module.PhotoOfTheWeekImageModule),
      },
      {
        path: 'events',
        resolve: { metadata: FindAllEntitiesResolver },
        loadChildren: () =>
          import('./events/events.module').then(
            (module) => module.EventsModule
          ),
      },
      {
        path: 'events/:slug',
        resolve: { metadata: FindOneEntityResolver },
        loadChildren: () =>
          import('./event/event.module').then((module) => module.EventModule),
      },
      {
        path: 'events/:slug/:event-image',
        loadChildren: () =>
          import('./event-image/event-image.module').then(
            (module) => module.EventImageModule
          ),
      },
      {
        path: 'destinations',
        resolve: { metadata: FindAllEntitiesResolver },
        loadChildren: () =>
          import('./destinations/destinations.module').then(
            (module) => module.DestinationsModule
          ),
      },
      {
        path: 'destinations/:slug',
        resolve: { metadata: FindOneEntityResolver },
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
