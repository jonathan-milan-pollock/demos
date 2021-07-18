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
  const foundImage = documentModel.images.find((image) => image.id == id);
  if (!foundImage) throw new NotFoundException('Image was not found');
  return foundImage;
};

export const validateOneImage = (images: Image[]): Image => {
  if (images.length == 0) throw new NotFoundException();

  if (images.length > 1)
    throw new ConflictException('More than one image was found');

  return images[0];
};

export const validateImageDocumentModelFound = (
  id: string,
  documentModel: DocumentModel
): DocumentModel => {
  const foundImage = documentModel.images.find((image) => image.id == id);
  if (!foundImage) throw new NotFoundException('Image was not found');
  return documentModel;
};

export const validateImagePublic = (image: Image): Image => {
  if (image.state !== MediaState.Public) throw new NotFoundException();
  return image;
};

export const validateImageNotAlreadyExists = (
  fileName: string,
  documentModel: DocumentModel
): DocumentModel => {
  const foundImage = documentModel.images.find(
    (image) => image.fileName == fileName
  );
  if (foundImage)
    throw new ConflictException(
      `Image with file name ${fileName} already exists`
    );
  return documentModel;
};

export const validateImageNotProcessing = (image: Image): Image => {
  if (image.isProcessing)
    throw new ConflictException(
      'Image cannot be modified as it currently being processed'
    );
  return image;
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
