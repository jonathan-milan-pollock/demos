import { ConflictException } from '@nestjs/common';

import { Image } from '@dark-rush-photography/shared/types';

export const validateStarredImageFound = (images: Image[]): Image => {
  const starredImage = images.find((image) => image.isStarred);
  if (!starredImage) {
    throw new ConflictException('Starred image was not found');
  }
  return starredImage;
};

export const validateImageDateCreatedFound = (image: Image): string => {
  if (!image.dateCreated)
    throw new ConflictException('Date image was created was not found');
  return image.dateCreated;
};

export const validateImageDatePublishedFound = (image: Image): string => {
  if (!image.datePublished)
    throw new ConflictException('Date image was published was not found');
  return image.datePublished;
};
