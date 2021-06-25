import { Injectable, NotFoundException } from '@nestjs/common';

import {
  ImageDimension,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { toImageDimension } from '../functions/image-dimension.functions';
import {
  ImageDimensionAddDto,
  ImageDimensionUpdateDto,
} from '@dark-rush-photography/api/types';

@Injectable()
export class ImageDimensionProvider {
  toImageDimension(imageDimension: ImageDimension): ImageDimension {
    return toImageDimension(imageDimension);
  }

  addImageDimension = (
    id: string,
    entityId: string,
    imageId: string,
    imageDimension: ImageDimensionAddDto,
    imageDimensions: ImageDimension[]
  ): Partial<DocumentModel> => ({
    imageDimensions: [
      ...imageDimensions,
      { ...imageDimension, id, entityId, imageId },
    ],
  });

  updateImageDimension = (
    id: string,
    foundImageDimension: ImageDimension,
    imageDimensionUpdate: ImageDimensionUpdateDto,
    imageDimensions: ImageDimension[]
  ): Partial<DocumentModel> => ({
    imageDimensions: [
      ...imageDimensions.filter((imageDimension) => imageDimension.id !== id),
      {
        ...foundImageDimension,
        ...imageDimensionUpdate,
      },
    ],
  });

  removeImageDimension = (
    id: string,
    imageDimensions: ImageDimension[]
  ): Partial<DocumentModel> => ({
    imageDimensions: [
      ...imageDimensions.filter((imageDimension) => imageDimension.id !== id),
    ],
  });

  findImageDimension = (
    imageId: string,
    imageDimensionType: ImageDimensionType,
    imageDimensions: ImageDimension[]
  ): ImageDimension | undefined => {
    return imageDimensions.find(
      (id) => id.imageId === imageId && id.type === imageDimensionType
    );
  };

  validateFindImageDimension = (
    id: string,
    imageDimensions: ImageDimension[]
  ): ImageDimension => {
    const foundImageDimension = imageDimensions.find(
      (imageDimension) => imageDimension.id === id
    );
    if (!foundImageDimension)
      throw new NotFoundException('Could not find image dimension to update');
    return foundImageDimension;
  };
}
