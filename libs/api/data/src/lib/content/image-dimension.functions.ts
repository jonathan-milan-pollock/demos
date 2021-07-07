import {
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

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

export const validateAddImageDimension = (
  imageId: string,
  imageDimensionAdd: ImageDimensionAdd,
  documentModel: DocumentModel
): DocumentModel => {
  const imageIds = documentModel.images.map((image) => image.id);
  if (!imageIds.includes(imageId)) {
    throw new NotFoundException('Could not find image for dimension');
  }
  const imageDimensionType = documentModel.imageDimensions.find(
    (imageDimension) => imageDimension.type === imageDimensionAdd.type
  );
  if (imageDimensionType) {
    throw new ConflictException(
      `Image dimension type ${imageDimensionType.type} already exists`,
      HttpStatus.FOUND
    );
  }
  return documentModel;
};
