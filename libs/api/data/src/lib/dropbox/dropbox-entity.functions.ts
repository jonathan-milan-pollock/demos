/*import { EntityType } from '@dark-rush-photography/shared/types';
import {
  DEFAULT_ENTITY_GROUP,
  FAVORITES_SLUG,
  DropboxMedia,
  REVIEW_MEDIA_SLUG,
} from '@dark-rush-photography/api/types';

export const getEvent = (fileNameSections: string[]): DropboxMedia => {
  return {
    fileName: fileNameSections[4].toLowerCase(),
    entityType: EntityType.Event,
    entityGroup: fileNameSections[2].toLowerCase(),
    entitySlug: fileNameSections[3].toLowerCase(),
  };
};

export const getFavorites = (fileNameSections: string[]): DropboxMedia => {
  return {
    fileName: fileNameSections[2].toLowerCase(),
    entityType: EntityType.Favorites,
    entityGroup: DEFAULT_ENTITY_GROUP,
    entitySlug: FAVORITES_SLUG,
  };
};

export const getPhotoOfTheWeek = (
  fileNameSections: string[]
): DropboxMedia => {
  return {
    fileName: fileNameSections[3].toLowerCase(),
    entityType: EntityType.PhotoOfTheWeek,
    entitySlug: fileNameSections[2].toLowerCase(),
    entityGroup: fileNameSections[1].toLowerCase(),
  };
};

export const getReviewMedia = (fileNameSections: string[]): DropboxMedia => {
  return {
    fileName: fileNameSections[2].toLowerCase(),
    entityType: EntityType.ReviewMedia,
    entityGroup: DEFAULT_ENTITY_GROUP,
    entitySlug: REVIEW_MEDIA_SLUG,
  };
};

export const getReview = (fileNameSections: string[]): DropboxMedia => {
  return {
    fileName: fileNameSections[2].toLowerCase(),
    entityType: EntityType.Review,
    entityGroup: DEFAULT_ENTITY_GROUP,
    entitySlug: fileNameSections[1].toLowerCase(),
  };
};

export const getSocialMedia = (fileNameSections: string[]): DropboxMedia => {
  return {
    fileName: fileNameSections[2].toLowerCase(),
    entityType: EntityType.SocialMedia,
    entityGroup: DEFAULT_ENTITY_GROUP,
    entitySlug: fileNameSections[1].toLowerCase(),
  };
};
*/