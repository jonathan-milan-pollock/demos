import { ConflictException } from '@nestjs/common';

import { Image, ImageState } from '@dark-rush-photography/shared/types';

export const validateOnePublishImage = (images: Image[]): Image => {
  const publishImages = images.filter(
    (image) =>
      image.state === ImageState.Selected || image.state === ImageState.Public
  );
  if (publishImages.length === 0) {
    throw new ConflictException('One publish image is required');
  }
  if (publishImages.length > 1) {
    throw new ConflictException('More than one publish image was found');
  }
  return publishImages[0];
};

export const validatePublishImagesHaveStorageIds = (
  images: Image[]
): Image[] => {
  const imagesWithoutStorageIds = images.filter(
    (image) =>
      !image.storageId &&
      (image.state === ImageState.Selected || image.state === ImageState.Public)
  );
  if (imagesWithoutStorageIds.length > 0) {
    throw new ConflictException('Image storage ids are required');
  }
  return images;
};

export const validatePublishImagesHaveSlugs = (images: Image[]): Image[] => {
  const imagesWithoutStorageIds = images.filter(
    (image) =>
      !image.slug &&
      (image.state === ImageState.Selected || image.state === ImageState.Public)
  );
  if (imagesWithoutStorageIds.length > 0) {
    throw new ConflictException('Image slugs are required');
  }
  return images;
};

export const validatePublishImagesAreNotStarredAndLoved = (
  images: Image[]
): Image[] => {
  const starredAndLovedImages = images.filter(
    (image) =>
      image.isStarred &&
      image.isLoved &&
      (image.state === ImageState.Selected || image.state === ImageState.Public)
  );
  if (starredAndLovedImages.length > 0)
    throw new ConflictException('Images cannot be both starred and loved');
  return images;
};

export const validatePublishStarredImage = (images: Image[]): Image => {
  const starredImages = images.filter(
    (image) =>
      image.isStarred &&
      (image.state === ImageState.Selected || image.state === ImageState.Public)
  );
  if (starredImages.length === 0) {
    throw new ConflictException('One starred publish image is required');
  }
  if (starredImages.length > 1) {
    throw new ConflictException('More than one publish image was starred');
  }
  return starredImages[0];
};

export const validatePublicStarredImage = (images: Image[]): Image => {
  const starredImages = images.filter(
    (image) => image.isStarred && image.state === ImageState.Public
  );

  if (starredImages.length === 0) {
    throw new ConflictException('One starred public image is required');
  }
  if (starredImages.length > 1) {
    throw new ConflictException('More than one public image was starred');
  }
  return starredImages[0];
};

export const validatePublishLovedImages = (images: Image[]): Image[] => {
  const lovedImages = images.filter(
    (image) =>
      image.isLoved &&
      (image.state === ImageState.Selected || image.state === ImageState.Public)
  );
  if (lovedImages.length === 0) {
    throw new ConflictException('At least one loved image is required');
  }
  if (lovedImages.length > 10) {
    throw new ConflictException('More than 10 images are loved');
  }
  return lovedImages;
};

export const validatePublishImagesHaveTitles = (images: Image[]): Image[] => {
  const imagesWithoutTitles = images.filter(
    (image) =>
      !image.title &&
      (image.state === ImageState.Selected || image.state === ImageState.Public)
  );
  if (imagesWithoutTitles.length > 0) {
    throw new ConflictException('Image titles are required');
  }
  return images;
};

export const validatePublishImagesHaveSeoDescriptions = (
  images: Image[]
): Image[] => {
  const imagesWithoutSeoDescriptions = images.filter(
    (image) =>
      !image.seoDescription &&
      (image.state === ImageState.Selected || image.state === ImageState.Public)
  );
  if (imagesWithoutSeoDescriptions.length > 0) {
    throw new ConflictException('Image SEO descriptions are required');
  }
  return images;
};

export const validatePublishImagesHaveSeoKeywords = (
  images: Image[]
): Image[] => {
  const imagesWithoutSeoKeywords = images.filter(
    (image) =>
      !image.seoKeywords &&
      (image.state === ImageState.Selected || image.state === ImageState.Public)
  );
  if (imagesWithoutSeoKeywords.length > 0) {
    throw new ConflictException('Image SEO keywords are required');
  }
  return images;
};
