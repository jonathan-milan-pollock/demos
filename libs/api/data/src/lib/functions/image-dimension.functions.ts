import { ImageDimension } from '@dark-rush-photography/shared-types';

export const toImageDimension = (
  imageDimension: ImageDimension
): ImageDimension => {
  return {
    id: imageDimension.id,
    entityId: imageDimension.entityId,
    imageId: imageDimension.imageId,
    type: imageDimension.type,
    state: imageDimension.state,
    pixels: imageDimension.pixels,
    settings: imageDimension.settings,
  };
};

export const findPublicImageDimensions = (
  publicImageIds: string[],
  imageDimensions: ImageDimension[]
): ImageDimension[] => {
  return imageDimensions
    .filter((id) => publicImageIds.includes(id.id))
    .map((id) => toImageDimension(id));
};
