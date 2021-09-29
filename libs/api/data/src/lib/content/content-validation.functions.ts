import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import {
  Image,
  ImageDimension,
  ImageDimensionType,
  ImageState,
  Video,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

export const validateImageFound = (image: Image | undefined): Image => {
  if (!image) throw new NotFoundException('Image was not found');
  return image;
};

export const validateImageFoundInEntity = (
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

export const validateCanSelectImage = (image: Image): Image => {
  if (image.state !== ImageState.New) {
    throw new ConflictException('Can only select new images');
  }
  return image;
};

export const validateCanMakeImagePublic = (image: Image): Image => {
  if (image.state !== ImageState.Selected) {
    throw new ConflictException('Can only make selected images public');
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
  state: ImageState,
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

export const validateVideoFound = (
  id: string,
  documentModel: DocumentModel
): Video => {
  const foundVideo = documentModel.videos.find((video) => video.id === id);
  if (!foundVideo) throw new NotFoundException('Video was not found');
  return foundVideo;
};
