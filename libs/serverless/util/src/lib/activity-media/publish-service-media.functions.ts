import { BadRequestException, Logger } from '@nestjs/common';

import { EntityType } from '@dark-rush-photography/shared-types';
import {
  getAboutActivityMedia,
  getBestOfActivityMedia,
  getDestinationActivityMedia,
  getEventActivityMedia,
  getFavoritesActivityMedia,
  getPhotoOfTheWeekActivityMedia,
  getReviewMediaActivityMedia,
  getReviewActivityMedia,
  getSocialMediaActivityMedia,
} from './publish-service-entity-media.functions';
import { ActivityMedia } from '@dark-rush-photography/serverless/types';

const entityNameMap = new Map<string, EntityType>([
  ['about', EntityType.About],
  ['destinations', EntityType.Destination],
  ['events', EntityType.Event],
  ['favorites', EntityType.Favorites],
  ['photooftheweek', EntityType.PhotoOfTheWeek],
  ['review', EntityType.ReviewMedia],
  ['reviews', EntityType.Review],
  ['socialmedia', EntityType.SocialMedia],
]);

const activityMediaMap = new Map<
  string,
  (fileNameSections: string[]) => ActivityMedia
>([
  [EntityType.About, getAboutActivityMedia],
  [EntityType.Destination, getDestinationActivityMedia],
  [EntityType.Event, getEventActivityMedia],
  [EntityType.Favorites, getFavoritesActivityMedia],
  [EntityType.PhotoOfTheWeek, getPhotoOfTheWeekActivityMedia],
  [EntityType.ReviewMedia, getReviewMediaActivityMedia],
  [EntityType.Review, getReviewActivityMedia],
  [EntityType.SocialMedia, getSocialMediaActivityMedia],
]);

const getFileNameSections = (fileName: string) => {
  const fileNameSections = fileName.split('---');
  if (fileNameSections.length === 0)
    throw new Error('--- is required to separate publish service segments');
  return fileNameSections;
};

const getEntityName = (firstFileNameSection: string) => {
  const entityName = firstFileNameSection.toLowerCase().replace(/\s+/g, '');
  Logger.log(`Entity name: ${entityName}`, getPublishServiceActivityMedia.name);
  return entityName;
};

const getEntityType = (entityName: string) => {
  const entityType = entityNameMap.get(entityName);
  if (!entityType) throw new Error(`Entity type ${entityType} was not found`);
  return entityType;
};

const getActivityMediaFunction = (entityType: EntityType) => {
  const activityMediaFn = activityMediaMap.get(entityType);
  if (!activityMediaFn) {
    throw new BadRequestException('Unable to find activity media function');
  }
  return activityMediaFn;
};

export const getPublishServiceActivityMedia = (
  fileName: string
): ActivityMedia => {
  if (!fileName) throw new Error('file name must be provided for upload');
  Logger.log(`File name: ${fileName}`, getPublishServiceActivityMedia.name);

  const fileNameSections = getFileNameSections(fileName);
  const entityName = getEntityName(fileNameSections[0]);

  if (entityName === 'bestof') {
    return getBestOfActivityMedia(fileNameSections);
  }

  return getActivityMediaFunction(getEntityType(entityName))(fileNameSections);
};
