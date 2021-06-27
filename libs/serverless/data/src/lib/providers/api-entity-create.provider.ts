import { BadRequestException, HttpService, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Entity, EntityType } from '@dark-rush-photography/shared-types';
import { ActivityMedia, Env } from '@dark-rush-photography/serverless/types';
import { apiAuth$ } from '@dark-rush-photography/shared-server/data';
import { createAbout$ } from '../functions/api-about.functions';
import { createBestOf$ } from '../functions/api-best-of.functions';
import { createDestination$ } from '../functions/api-destinations.functions';
import { createEvent$ } from '../functions/api-events.functions';
import { createFavorites$ } from '../functions/api-favorites.functions';
import { createMediaProcess$ } from '../functions/api-media-process.functions';
import { createPhotoOfTheWeek$ } from '../functions/api-photo-of-the-week.functions';
import { createReviewMedia$ } from '../functions/api-review-media.functions';
import { createReview$ } from '../functions/api-reviews.functions';
import { createSocialMedia$ } from '../functions/api-social-media.functions';

@Injectable()
export class ApiEntityCreateProvider {
  createEntity$ = (
    env: Env,
    httpService: HttpService,
    activityMedia: ActivityMedia
  ): Observable<Partial<Entity>> => {
    return apiAuth$(env.apiAuth, httpService).pipe(
      map((authToken) => {
        switch (activityMedia.entityType) {
          case EntityType.About:
            return createAbout$(
              env.api,
              httpService,
              authToken,
              activityMedia.entitySlug
            ) as Partial<Entity>;
          case EntityType.BestOfChildren:
          case EntityType.BestOfEvents:
          case EntityType.BestOfLandscapes:
          case EntityType.BestOfNature:
          case EntityType.BestOfRealEstate:
            return createBestOf$(
              env.api,
              httpService,
              authToken,
              activityMedia.entityType
            ) as Partial<Entity>;
          case EntityType.Destination:
            return createDestination$(
              env.api,
              httpService,
              authToken,
              activityMedia.entitySlug
            ) as Partial<Entity>;
          case EntityType.Event:
            if (!activityMedia.entityGroup) {
              throw new BadRequestException(
                'An entity group is required to create an event'
              );
            }
            return createEvent$(
              env.api,
              httpService,
              authToken,
              activityMedia.entityGroup,
              activityMedia.entitySlug
            ) as Partial<Entity>;
          case EntityType.Favorites:
            return createFavorites$(
              env.api,
              httpService,
              authToken
            ) as Partial<Entity>;
          case EntityType.MediaProcessAppleIcon:
          case EntityType.MediaProcessAppleResource:
          case EntityType.MediaProcessImageVideo:
          case EntityType.MediaProcessPostMobileImage:
          case EntityType.MediaProcessPng:
            return createMediaProcess$(
              env.api,
              httpService,
              authToken,
              activityMedia.entityType,
              activityMedia.entitySlug
            ) as Partial<Entity>;
          case EntityType.PhotoOfTheWeek:
            if (!activityMedia.entityGroup) {
              throw new BadRequestException(
                'An entity group is required to create a photo of the week'
              );
            }
            return createPhotoOfTheWeek$(
              env.api,
              httpService,
              authToken,
              activityMedia.entityGroup,
              activityMedia.entitySlug
            ) as Partial<Entity>;
          case EntityType.ReviewMedia:
            return createReviewMedia$(
              env.api,
              httpService,
              authToken
            ) as Partial<Entity>;
          case EntityType.Review:
            return createReview$(
              env.api,
              httpService,
              authToken,
              activityMedia.entitySlug
            ) as Partial<Entity>;
          case EntityType.SocialMedia:
            if (!activityMedia.entityGroup) {
              throw new BadRequestException(
                'An entity group is required to create a social media entity'
              );
            }
            return createSocialMedia$(
              env.api,
              httpService,
              authToken,
              activityMedia.entityGroup,
              activityMedia.entitySlug
            ) as Partial<Entity>;
        }
      })
    );
  };
}
