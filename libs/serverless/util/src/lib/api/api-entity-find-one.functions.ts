import { BadRequestException, HttpService } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Entity, EntityType } from '@dark-rush-photography/shared-types';
import { ActivityMedia, Env } from '@dark-rush-photography/serverless/types';
import { apiAuth$ } from './api-auth.functions';
import { findOneAbout$ } from './api-about.functions';
import { findOneBestOf$ } from './api-best-of.functions';
import { findOneDestination$ } from './api-destinations.functions';
import { findOneEvent$ } from './api-events.functions';
import { findOneFavorites$ } from './api-favorites.functions';
import { findOneMediaProcess$ } from './api-media-process.functions';
import { findOnePhotoOfTheWeek$ } from './api-photo-of-the-week.functions';
import { findOneReviewMedia$ } from './api-review-media.functions';
import { findOneReview$ } from './api-reviews.functions';
import { findOneSocialMedia$ } from './api-social-media.functions';

export const findOneEntity$ = (
  env: Env,
  httpService: HttpService,
  activityMedia: ActivityMedia
): Observable<Partial<Entity>> => {
  const entityId = activityMedia.entityId;
  if (!entityId)
    throw new BadRequestException('An entity id is required to find one');

  return apiAuth$(env.apiAuth, httpService).pipe(
    map((authToken) => {
      switch (activityMedia.entityType) {
        case EntityType.About:
          return findOneAbout$(
            env.api,
            httpService,
            authToken,
            entityId
          ) as Partial<Entity>;
        case EntityType.BestOfChildren:
        case EntityType.BestOfEvents:
        case EntityType.BestOfLandscapes:
        case EntityType.BestOfNature:
        case EntityType.BestOfRealEstate:
          return findOneBestOf$(
            env.api,
            httpService,
            authToken,
            activityMedia.entityType
          ) as Partial<Entity>;
        case EntityType.Destination:
          return findOneDestination$(
            env.api,
            httpService,
            authToken,
            entityId
          ) as Partial<Entity>;
        case EntityType.Event:
          return findOneEvent$(
            env.api,
            httpService,
            authToken,
            entityId
          ) as Partial<Entity>;
        case EntityType.Favorites:
          return findOneFavorites$(
            env.api,
            httpService,
            authToken
          ) as Partial<Entity>;
        case EntityType.MediaProcessAppleResource:
        case EntityType.MediaProcessIcon:
        case EntityType.MediaProcessImageVideo:
        case EntityType.MediaProcessMobileImage:
        case EntityType.MediaProcessPng:
          return findOneMediaProcess$(
            env.api,
            httpService,
            authToken,
            activityMedia.entityType,
            entityId
          ) as Partial<Entity>;
        case EntityType.PhotoOfTheWeek:
          return findOnePhotoOfTheWeek$(
            env.api,
            httpService,
            authToken,
            entityId
          ) as Partial<Entity>;
        case EntityType.ReviewMedia:
          return findOneReviewMedia$(
            env.api,
            httpService,
            authToken,
            entityId
          ) as Partial<Entity>;
        case EntityType.Review:
          return findOneReview$(
            env.api,
            httpService,
            authToken,
            entityId
          ) as Partial<Entity>;
        case EntityType.SocialMedia:
          return findOneSocialMedia$(
            env.api,
            httpService,
            authToken,
            entityId
          ) as Partial<Entity>;
      }
    })
  );
};
