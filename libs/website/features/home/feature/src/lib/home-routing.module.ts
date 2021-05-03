import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaResolver } from '@dark-rush-photography/website/util';

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
        resolve: { metadata: MetaResolver },
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
        path: 'events/:event',
        resolve: { metadata: MetaResolver },
        loadChildren: () =>
          import('./event/event.module').then((module) => module.EventModule),
      },
      {
        path: 'events/:event/:event-image',
        resolve: { metadata: MetaResolver },
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
        path: 'destinations/:destination',
        resolve: { metadata: MetaResolver },
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
