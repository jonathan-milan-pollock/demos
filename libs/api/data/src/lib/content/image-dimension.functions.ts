import { ImageDimension } from '@dark-rush-photography/shared/types';

export const findPublicImageDimensions = (
  imageDimensions: ImageDimension[],
  publicImageIds: string[]
): ImageDimension[] => {
  return imageDimensions
    .filter((id) => publicImageIds.includes(id.imageId))
    .map((id) => loadImageDimension(id));
};

export const loadImageDimension = (
  imageDimension: ImageDimension
): ImageDimension => {
  return {
    id: imageDimension.id,
    entityId: imageDimension.entityId,
    imageId: imageDimension.imageId,
    type: imageDimension.type,
    resolution: imageDimension.resolution,
    threeSixtySettings: imageDimension.threeSixtySettings,
  };
};
