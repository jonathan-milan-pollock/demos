import { ConflictException, NotFoundException } from '@nestjs/common';

import {
  ImageDimension,
  ImageDimensionAdd,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

export const toImageDimension = (
  imageDimension: ImageDimension
): ImageDimension => {
  return {
    id: imageDimension.id,
    entityId: imageDimension.entityId,
    imageId: imageDimension.imageId,
    type: imageDimension.type,
    pixels: imageDimension.pixels,
    threeSixtyImageSettings: imageDimension.threeSixtyImageSettings,
  };
};

export const findPublicImageDimensions = (
  imageDimensions: ImageDimension[],
  publicImageIds: string[]
): ImageDimension[] => {
  return imageDimensions
    .filter((id) => publicImageIds.includes(id.imageId))
    .map((id) => toImageDimension(id));
};

export const validateFoundImage = (
  imageId: string,
  documentModel: DocumentModel
): DocumentModel => {
  const foundImage = documentModel.images.find((image) => image.id === imageId);
  if (!foundImage) {
    throw new NotFoundException('Could not find image for dimension');
  }
  return documentModel;
};

export const validateAddImageDimension = (
  imageId: string,
  imageDimensionAdd: ImageDimensionAdd,
  documentModel: DocumentModel
): DocumentModel => {
  const imageDimensionType = documentModel.imageDimensions.find(
    (imageDimension) =>
      imageDimension.imageId === imageId &&
      imageDimension.type === imageDimensionAdd.type
  );
  if (imageDimensionType) {
    throw new ConflictException(
      `Image dimension type ${imageDimensionType.type} already exists`
    );
  }
  return documentModel;
};
