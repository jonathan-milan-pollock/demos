import { BadRequestException } from '@nestjs/common';

import { EntityType } from '@dark-rush-photography/shared/types';
import {
  FAVORITES_SLUG,
  LightroomMedia,
  REVIEW_MEDIA_SLUG,
} from '@dark-rush-photography/api/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/shared-server/types';

export const getAbout = (fileNameSections: string[]): LightroomMedia => {
  return {
    fileName: fileNameSections[3].toLowerCase(),
    entityType: EntityType.About,
    entityGroup: DEFAULT_ENTITY_GROUP,
    entitySlug: fileNameSections[1].toLowerCase(),
  };
};

export const getBestOf = (fileNameSections: string[]): LightroomMedia => {
  const fileName = fileNameSections[3].toLowerCase();
  const entityGroup = DEFAULT_ENTITY_GROUP;
  const entitySlug = fileNameSections[1].toLowerCase();

  //TODO: Get rid of this switch map slug to entity type
  switch (entitySlug) {
    case 'children':
      return {
        fileName,
        entityType: EntityType.BestOfChildren,
        entityGroup,
        entitySlug,
      };
    case 'events':
      return {
        fileName,
        entityType: EntityType.BestOfEvents,
        entityGroup,
        entitySlug,
      };
    case 'landscapes':
      return {
        fileName,
        entityType: EntityType.BestOfLandscapes,
        entityGroup,
        entitySlug,
      };
    case 'nature':
      return {
        fileName,
        entityType: EntityType.BestOfNature,
        entityGroup,
        entitySlug,
      };
    case 'realestate':
      return {
        fileName,
        entityType: EntityType.BestOfRealEstate,
        entityGroup,
        entitySlug,
      };
  }
  throw new BadRequestException(
    `Unable to find best of type from entity slug ${entitySlug}`
  );
};

export const getDestination = (fileNameSections: string[]): LightroomMedia => {
  return {
    fileName: fileNameSections[3].toLowerCase(),
    entityType: EntityType.Destination,
    entityGroup: DEFAULT_ENTITY_GROUP,
    entitySlug: fileNameSections[1].toLowerCase(),
  };
};

export const getEvent = (fileNameSections: string[]): LightroomMedia => {
  return {
    fileName: fileNameSections[4].toLowerCase(),
    entityType: EntityType.Event,
    entityGroup: fileNameSections[2].toLowerCase(),
    entitySlug: fileNameSections[3].toLowerCase(),
  };
};

export const getFavorites = (fileNameSections: string[]): LightroomMedia => {
  return {
    fileName: fileNameSections[2].toLowerCase(),
    entityType: EntityType.Favorites,
    entityGroup: DEFAULT_ENTITY_GROUP,
    entitySlug: FAVORITES_SLUG,
  };
};

export const getPhotoOfTheWeek = (
  fileNameSections: string[]
): LightroomMedia => {
  return {
    fileName: fileNameSections[3].toLowerCase(),
    entityType: EntityType.PhotoOfTheWeek,
    entitySlug: fileNameSections[2].toLowerCase(),
    entityGroup: fileNameSections[1].toLowerCase(),
  };
};

export const getReviewMedia = (fileNameSections: string[]): LightroomMedia => {
  return {
    fileName: fileNameSections[2].toLowerCase(),
    entityType: EntityType.ReviewMedia,
    entityGroup: DEFAULT_ENTITY_GROUP,
    entitySlug: REVIEW_MEDIA_SLUG,
  };
};

export const getReview = (fileNameSections: string[]): LightroomMedia => {
  return {
    fileName: fileNameSections[2].toLowerCase(),
    entityType: EntityType.Review,
    entityGroup: DEFAULT_ENTITY_GROUP,
    entitySlug: fileNameSections[1].toLowerCase(),
  };
};

export const getSocialMedia = (fileNameSections: string[]): LightroomMedia => {
  return {
    fileName: fileNameSections[2].toLowerCase(),
    entityType: EntityType.SocialMedia,
    entityGroup: DEFAULT_ENTITY_GROUP,
    entitySlug: fileNameSections[1].toLowerCase(),
  };
};
