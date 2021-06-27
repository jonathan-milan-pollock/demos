import { ImageDimension } from '@dark-rush-photography/shared-types';

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
