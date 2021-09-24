import { ConflictException, NotFoundException } from '@nestjs/common';

import {
  Image,
  ImageDimension,
  ImageDimensionType,
  MediaState,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

export const validateImageFound = (
  id: string,
  documentModel: DocumentModel
): Image => {
  const foundImage = documentModel.images.find((image) => image.id === id);
  if (!foundImage) throw new NotFoundException('Image was not found');
  return foundImage;
};

export const validateOneImage = (images: Image[]): Image => {
  if (images.length === 0) throw new NotFoundException();

  if (images.length > 1)
    throw new ConflictException('More than one image was found');

  return images[0];
};

export const validateDocumentModelForImageFound = (
  id: string,
  documentModel: DocumentModel
): DocumentModel => {
  const foundImage = documentModel.images.find((image) => image.id === id);
  if (!foundImage)
    throw new NotFoundException('Document model for image was not found');
  return documentModel;
};

export const validateImageNotPublished = (image: Image): Image => {
  if (image.state !== MediaState.Published) throw new NotFoundException();
  return image;
};

export const validateImageNotNew = (image: Image): Image => {
  if (image.state !== MediaState.New) throw new NotFoundException();
  return image;
};

export const validateImageNotAlreadyExists = (
  state: MediaState,
  fileName: string,
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

export const validateFindStarredImage = (images: Image[]): Image => {
  const starredImage = images.find((image) => image.isStarred);
  if (!starredImage) {
    throw new ConflictException('Starred image was not found');
  }
  return starredImage;
};

export const validateImageDateCreated = (image: Image): string => {
  if (!image.dateCreated)
    throw new ConflictException('Date image was created was not found');
  return image.dateCreated;
};

export const validateFindImageDimension = (
  imageId: string,
  imageDimensionType: ImageDimensionType,
  imageDimensions: ImageDimension[]
): ImageDimension => {
  const imageDimension = imageDimensions.find(
    (imageDimension) =>
      imageDimension.imageId === imageId &&
      imageDimension.type === imageDimensionType
  );
  if (!imageDimension) {
    throw new ConflictException(
      `Image dimension type ${imageDimensionType} was not found`
    );
  }
  return imageDimension;
};

export const validateImageDimensionNotAlreadyExists = (
  imageId: string,
  imageDimensionType: ImageDimensionType,
  documentModel: DocumentModel
): DocumentModel => {
  const imageDimension = documentModel.imageDimensions.find(
    (imageDimension) =>
      imageDimension.imageId === imageId &&
      imageDimension.type === imageDimensionType
  );
  if (imageDimension) {
    throw new ConflictException(
      `Image dimension type ${imageDimensionType} already exists`
    );
  }
  return documentModel;
};
