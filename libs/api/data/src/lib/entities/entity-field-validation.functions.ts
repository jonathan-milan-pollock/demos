import { ConflictException } from '@nestjs/common';

import {
  Entity,
  Image,
  ImageVideo,
  Location,
} from '@dark-rush-photography/shared/types';

export const validateEntityGoogleDriveFolderId = (entity: Entity): string => {
  if (!entity.googleDriveFolderId) {
    throw new ConflictException('Google Drive folder id is required');
  }
  return entity.googleDriveFolderId;
};

export const validateEntityGroup = (entity: Entity): string => {
  if (entity.group === '')
    throw new ConflictException('Group cannot be an empty string');
  return entity.group;
};

export const validateEntitySlug = (entity: Entity): string => {
  if (entity.slug === '')
    throw new ConflictException('Slug cannot be an empty string');
  return entity.slug;
};

export const validateEntityOrder = (entity: Entity): number => {
  if (entity.order < 0)
    throw new ConflictException('Order must be greater than or equal to 0');
  return entity.order;
};

export const validateEntityTitle = (entity: Entity): string => {
  if (!entity.title) throw new ConflictException('Title is required');
  return entity.title;
};

export const validateEntitySeoDescription = (entity: Entity): string => {
  if (!entity.seoDescription)
    throw new ConflictException('SEO description is required');
  return entity.seoDescription;
};

export const validateEntitySeoKeywords = (entity: Entity): string[] => {
  if (entity.seoKeywords.length === 0)
    throw new ConflictException('SEO keywords are required');
  return entity.seoKeywords;
};

export const validateEntityCreatedDate = (entity: Entity): string => {
  if (!entity.createdDate)
    throw new ConflictException('Date created is required');
  return entity.createdDate;
};

export const validateEntityPublishedDate = (entity: Entity): string => {
  if (!entity.publishedDate)
    throw new ConflictException('Date published is required');
  return entity.publishedDate;
};

export const validateEntityLocation = (entity: Entity): Location => {
  if (!entity.location) throw new ConflictException('A location is required');
  return entity.location;
};

export const validateEntityText = (entity: Entity): string => {
  if (!entity.text) throw new ConflictException('Text is empty');
  return entity.text;
};

export const validateEntityImageVideo = (entity: Entity): ImageVideo => {
  if (!entity.imageVideo)
    throw new ConflictException('An image video is required');

  return entity.imageVideo;
};

export const validateEntityStarredImage = (entity: Entity): Image => {
  const starredImages = entity.images.filter((image) => image.isStarred);
  if (starredImages.length === 0) {
    throw new ConflictException('An image was not starred');
  }
  if (starredImages.length > 1) {
    throw new ConflictException('More than one image was starred');
  }
  return starredImages[0];
};
