import { ConflictException } from '@nestjs/common';

import { Image } from '@dark-rush-photography/shared/types';

export const validateImageCreatedDate = (image: Image): string => {
  if (!image.createdDate)
    throw new ConflictException('Date image was created was not found');
  return image.createdDate;
};
