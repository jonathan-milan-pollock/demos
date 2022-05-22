import { ConflictException, NotFoundException } from '@nestjs/common';

import {
  Image,
  ImageState,
  ImageVideo,
} from '@dark-rush-photography/shared/types';

export const validateImageFound = (imageId: string, images: Image[]): Image => {
  const foundImage = images.find((image) => image.id === imageId);
  if (!foundImage) throw new NotFoundException();
  return foundImage;
};

export const validateCanArchiveImage = (image: Image): Image => {
  if (image.state !== ImageState.Public) {
    throw new ConflictException('Can only archive public images');
  }
  return image;
};

export const validateCanUnarchiveImage = (image: Image): Image => {
  if (image.state !== ImageState.Archived) {
    throw new ConflictException('Can only unarchive archived images');
  }
  return image;
};

export const validatePublishImage = (image: Image): Image => {
  if (
    !(image.state === ImageState.Selected || image.state === ImageState.Public)
  )
    throw new ConflictException('Image must be selected or public');
  return image;
};

export const validateImageVideo = (imageVideo?: ImageVideo): ImageVideo => {
  if (!imageVideo) throw new ConflictException('Image video is required');

  return imageVideo;
};
