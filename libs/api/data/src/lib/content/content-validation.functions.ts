import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { Image, ImageState, Video } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

export const validateImageFound = (
  imageId: string,
  documentModel: DocumentModel
): Image => {
  const foundImage = documentModel.images.find((image) => image.id === imageId);
  if (!foundImage) throw new NotFoundException('Image was not found');
  return foundImage;
};

export const validateCanSelectImage = (image: Image): Image => {
  if (image.state !== ImageState.New) {
    throw new ConflictException('Can only select new images');
  }
  return image;
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

export const validateImagePublic = (image: Image): Image => {
  if (image.state !== ImageState.Public) throw new NotFoundException();
  return image;
};

export const validateImageSelectedOrPublic = (image: Image): Image => {
  if (
    !(image.state === ImageState.Selected || image.state === ImageState.Public)
  )
    throw new BadRequestException('Image must be selected or public');
  return image;
};

export const validateImageWithFileNameNotAlreadyExists = (
  fileName: string,
  state: ImageState,
  documentModel: DocumentModel
): DocumentModel => {
  const foundImage = documentModel.images.find(
    (image) => image.fileName === fileName && image.state === state
  );
  if (foundImage)
    throw new ConflictException(
      `Image with file name ${fileName} already exists for state ${state}`
    );
  return documentModel;
};

export const validateStarredImage = (images: Image[]): Image => {
  const starredImages = images.filter((image) => image.isStarred);
  if (starredImages.length === 0) {
    throw new ConflictException('An image was not starred');
  }
  if (starredImages.length > 1) {
    throw new ConflictException('More than one image was starred');
  }
  return starredImages[0];
};

export const validateVideo = (videos: Video[]): Video => {
  if (videos.length === 0) {
    throw new ConflictException('A video was not found');
  }
  return videos[0];
};
