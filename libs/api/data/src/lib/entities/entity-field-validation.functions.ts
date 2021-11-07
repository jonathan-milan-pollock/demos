import { ConflictException } from '@nestjs/common';

import {
  Dimension,
  Entity,
  Location,
} from '@dark-rush-photography/shared/types';

export const validateEntityGoogleDriveFolderId = (entity: Entity): string => {
  if (!entity.googleDriveFolderId) {
    throw new ConflictException('Google Drive folder id is required');
  }
  return entity.googleDriveFolderId;
};

export const validateEntityGroup = (entity: Entity): string => {
  if (entity.group === '') throw new ConflictException('Group is required');
  return entity.group;
};

export const validateEntitySlug = (entity: Entity): string => {
  if (entity.slug === '') throw new ConflictException('Slug is required');

  if (entity.slug.includes(' '))
    throw new ConflictException('Slug cannot contain spaces');

  if (entity.slug.toLowerCase() !== entity.slug)
    throw new ConflictException('Slug must be lowercase');

  if (encodeURIComponent(entity.slug) !== entity.slug)
    throw new ConflictException('Slug cannot require URI encoding');

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

export const validateEntityText = (entity: Entity): string => {
  if (!entity.text) throw new ConflictException('Text is required');
  return entity.text;
};

export const validateEntityCreatedDate = (entity: Entity): string => {
  if (!entity.createdDate)
    throw new ConflictException('Created date is required');
  return entity.createdDate;
};

export const validateEntityPublishedDate = (entity: Entity): string => {
  if (!entity.publishedDate)
    throw new ConflictException('Published date is required');
  return entity.publishedDate;
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

export const validateEntityLocation = (entity: Entity): Location => {
  if (!entity.location) throw new ConflictException('Location is required');
  return entity.location;
};

export const validateEntityTileDimension = (entity: Entity): Dimension => {
  if (!entity.tileDimension)
    throw new ConflictException('Tile dimension is required');

  if (entity.tileDimension.width <= 0) {
    throw new ConflictException('Tile dimension width must be greater than 0');
  }

  if (entity.tileDimension.height <= 0) {
    throw new ConflictException('Tile dimension height must be greater than 0');
  }

  return entity.tileDimension;
};
