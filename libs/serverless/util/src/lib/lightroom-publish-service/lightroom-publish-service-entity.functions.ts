import { BadRequestException } from '@nestjs/common';

import { EntityType } from '@dark-rush-photography/shared/types';
import {
  FAVORITES_SLUG,
  REVIEW_MEDIA_SLUG,
} from '@dark-rush-photography/shared-server/types';
import { ActivityMedia } from '@dark-rush-photography/serverless/types';

export const getAboutActivityMedia = (
  fileNameSections: string[]
): ActivityMedia => {
  return {
    entityType: EntityType.About,
    entitySlug: fileNameSections[1].toLowerCase(),
    fileName: fileNameSections[3].toLowerCase(),
  };
};

export const getBestOfActivityMedia = (
  fileNameSections: string[]
): ActivityMedia => {
  const entitySlug = fileNameSections[1].toLowerCase();
  const fileName = fileNameSections[3].toLowerCase();

  switch (entitySlug) {
    case 'children':
      return {
        entityType: EntityType.BestOfChildren,
        entitySlug,
        fileName,
      };
    case 'events':
      return {
        entityType: EntityType.BestOfEvents,
        entitySlug,
        fileName,
      };
    case 'landscapes':
      return {
        entityType: EntityType.BestOfLandscapes,
        entitySlug,
        fileName,
      };
    case 'nature':
      return {
        entityType: EntityType.BestOfNature,
        entitySlug,
        fileName,
      };
    case 'realestate':
      return {
        entityType: EntityType.BestOfRealEstate,
        entitySlug,
        fileName,
      };
  }
  throw new BadRequestException(
    `Unable to find best of type from entity slug ${entitySlug}`
  );
};

export const getDestinationActivityMedia = (
  fileNameSections: string[]
): ActivityMedia => {
  return {
    entityType: EntityType.Destination,
    entitySlug: fileNameSections[1].toLowerCase(),
    fileName: fileNameSections[3].toLowerCase(),
  };
};

export const getEventActivityMedia = (
  fileNameSections: string[]
): ActivityMedia => {
  return {
    entityType: EntityType.Event,
    entitySlug: fileNameSections[3].toLowerCase(),
    entityGroup: fileNameSections[2].toLowerCase(),
    fileName: fileNameSections[4].toLowerCase(),
  };
};

export const getFavoritesActivityMedia = (
  fileNameSections: string[]
): ActivityMedia => {
  return {
    entityType: EntityType.Favorites,
    entitySlug: FAVORITES_SLUG,
    fileName: fileNameSections[2].toLowerCase(),
  };
};

export const getPhotoOfTheWeekActivityMedia = (
  fileNameSections: string[]
): ActivityMedia => {
  return {
    entityType: EntityType.PhotoOfTheWeek,
    entitySlug: fileNameSections[2].toLowerCase(),
    entityGroup: fileNameSections[1].toLowerCase(),
    fileName: fileNameSections[3].toLowerCase(),
  };
};

export const getReviewMediaActivityMedia = (
  fileNameSections: string[]
): ActivityMedia => {
  return {
    entityType: EntityType.ReviewMedia,
    entitySlug: REVIEW_MEDIA_SLUG,
    fileName: fileNameSections[2].toLowerCase(),
  };
};

export const getReviewActivityMedia = (
  fileNameSections: string[]
): ActivityMedia => {
  return {
    entityType: EntityType.Review,
    entitySlug: fileNameSections[1].toLowerCase(),
    fileName: fileNameSections[2].toLowerCase(),
  };
};

export const getSocialMediaActivityMedia = (
  fileNameSections: string[]
): ActivityMedia => {
  return {
    entityType: EntityType.SocialMedia,
    entitySlug: fileNameSections[1].toLowerCase(),
    fileName: fileNameSections[2].toLowerCase(),
  };
};
