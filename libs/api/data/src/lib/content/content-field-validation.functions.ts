import { ConflictException } from '@nestjs/common';

import { Image } from '@dark-rush-photography/shared/types';

export const validateImageDateCreated = (image: Image): string => {
  if (!image.dateCreated)
    throw new ConflictException('Date image was created was not found');
  return image.dateCreated;
};

export const validateImageDatePublished = (image: Image): string => {
  if (!image.datePublished)
    throw new ConflictException('Date image was published was not found');
  return image.datePublished;
};
