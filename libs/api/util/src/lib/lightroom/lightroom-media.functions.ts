import { BadRequestException, Logger } from '@nestjs/common';

import { EntityType } from '@dark-rush-photography/shared/types';
import { LightroomMedia } from '@dark-rush-photography/api/types';
import {
  getAbout,
  getBestOf,
  getDestination,
  getEvent,
  getFavorites,
  getPhotoOfTheWeek,
  getReviewMedia,
  getReview,
  getSocialMedia,
} from './lightroom-entity.functions';

export const getLightroomMedia = (fileName: string): LightroomMedia => {
  const fileNameSections = getFileNameSections(fileName);
  const entityName = getEntityName(fileNameSections[0]);

  if (entityName == 'bestof') {
    return getBestOf(fileNameSections);
  }

  return getFunction(getEntityType(entityName))(fileNameSections);
};

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
  (fileNameSections: string[]) => LightroomMedia
>([
  [EntityType.About, getAbout],
  [EntityType.Destination, getDestination],
  [EntityType.Event, getEvent],
  [EntityType.Favorites, getFavorites],
  [EntityType.PhotoOfTheWeek, getPhotoOfTheWeek],
  [EntityType.ReviewMedia, getReviewMedia],
  [EntityType.Review, getReview],
  [EntityType.SocialMedia, getSocialMedia],
]);

const getFileNameSections = (fileName: string) => {
  const fileNameSections = fileName.split('---');
  if (fileNameSections.length == 0) {
    const message = '--- is required to separate publish service segments';
    Logger.log(message, getFileNameSections.name);
    throw new BadRequestException(message);
  }
  return fileNameSections;
};

const getEntityName = (firstFileNameSection: string) => {
  const entityName = firstFileNameSection.toLowerCase().replace(/\s+/g, '');
  Logger.log(`Entity name: ${entityName}`, getLightroomMedia.name);
  return entityName;
};

const getEntityType = (entityName: string) => {
  const entityType = entityNameMap.get(entityName);
  if (!entityType) {
    throw new BadRequestException(`Entity type ${entityType} was not found`);
  }
  return entityType;
};

const getFunction = (entityType: EntityType) => {
  const activityMediaFn = activityMediaMap.get(entityType);
  if (!activityMediaFn) {
    throw new BadRequestException('Unable to find activity media function');
  }
  return activityMediaFn;
};
