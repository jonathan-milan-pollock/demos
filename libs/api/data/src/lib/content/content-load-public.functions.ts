import {
  Image,
  ImageDimension,
  ImageState,
  PublicContent,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadImageAdmin, reloadImageDimension } from './content-load.functions';

export const loadPublicContent = (
  documentModel: DocumentModel
): PublicContent => {
  const publicImages = findPublicImages(documentModel.images);
  const publicImageIds = publicImages.map((image) => image.id);
  const publicImageDimensions = findPublicImageDimensions(
    documentModel.imageDimensions,
    publicImageIds
  );

  return {
    images: publicImages,
    imageDimensions: publicImageDimensions,
  };
};

export const findPublicImages = (images: Image[]): Image[] => {
  return images
    .filter((image) => image.state === ImageState.Public)
    .map(loadImageAdmin);
};

export const findPublicImageDimensions = (
  imageDimensions: ImageDimension[],
  publicImageIds: string[]
): ImageDimension[] => {
  return imageDimensions
    .filter((imageDimension) => publicImageIds.includes(imageDimension.imageId))
    .map((imageDimension) => reloadImageDimension(imageDimension));
};
