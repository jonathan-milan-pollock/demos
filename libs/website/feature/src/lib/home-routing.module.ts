import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  FindAllEntitiesResolver,
  FindAllPublicEntitiesResolver,
  FindOneEntityResolver,
  FindOnePublicEntityResolver,
} from '@dark-rush-photography/website/data';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        resolve: { entity: FindOneEntityResolver },
        loadChildren: () =>
          import('./favorites/favorites.module').then(
            (module) => module.FavoritesModule
          ),
      },
      {
        path: 'favorites/:storageId',
        loadChildren: () =>
          import('./favorite-image/favorite-image.module').then(
            (module) => module.FavoriteImageModule
          ),
      },
      {
        path: 'favorites/:threeSixtyImageStorageId/360',
        loadChildren: () =>
          import(
            './favorite-three-sixty-image/favorite-three-sixty-image.module'
          ).then((module) => module.FavoriteThreeSixtyImageModule),
      },
      {
        path: 'about',
        resolve: { entities: FindAllEntitiesResolver },
        loadChildren: () =>
          import('./about/about.module').then((module) => module.AboutModule),
      },
      {
        path: 'reviews',
        resolve: { entities: FindAllEntitiesResolver },
        loadChildren: () =>
          import('./reviews/reviews.module').then(
            (module) => module.ReviewsModule
          ),
      },
      {
        path: 'reviews/review',
        resolve: { entity: FindOneEntityResolver },
        loadChildren: () =>
          import('./review-media/review-media.module').then(
            (module) => module.ReviewMediaModule
          ),
      },
      {
        path: 'photo-of-the-week',
        resolve: { entities: FindAllPublicEntitiesResolver },
        loadChildren: () =>
          import('./photo-of-the-week/photo-of-the-week.module').then(
            (module) => module.PhotoOfTheWeekModule
          ),
      },
      {
        path: 'photo-of-the-week/:slug',
        resolve: { entity: FindOnePublicEntityResolver },
        loadChildren: () =>
          import(
            './photo-of-the-week-image/photo-of-the-week-image.module'
          ).then((module) => module.PhotoOfTheWeekImageModule),
      },
      {
        path: 'events',
        resolve: { entities: FindAllPublicEntitiesResolver },
        loadChildren: () =>
          import('./events/events.module').then(
            (module) => module.EventsModule
          ),
      },
      {
        path: 'events/:slug',
        resolve: { entity: FindOnePublicEntityResolver },
        loadChildren: () =>
          import('./event/event.module').then((module) => module.EventModule),
      },
      {
        path: 'events/:slug/:storageId',
        loadChildren: () =>
          import('./event-image/event-image.module').then(
            (module) => module.EventImageModule
          ),
      },
      {
        path: 'events/:slug/:threeSixtyImageStorageId/360',
        loadChildren: () =>
          import(
            './event-three-sixty-image/event-three-sixty-image.module'
          ).then((module) => module.EventThreeSixtyImageModule),
      },
      {
        path: 'destinations',
        resolve: { entities: FindAllPublicEntitiesResolver },
        loadChildren: () =>
          import('./destinations/destinations.module').then(
            (module) => module.DestinationsModule
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
