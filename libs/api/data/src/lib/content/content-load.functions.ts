import { ImageDto, ImageMinimalDto } from '@dark-rush-photography/api/types';
import {
  Image,
  ImageAdmin,
  ImageDimension,
  Location,
  LocationPublic,
  Video,
} from '@dark-rush-photography/shared/types';

export const loadLocation = (location: Location): LocationPublic => ({
  place: location.place ?? '',
  street: location.street ?? '',
  city: location.city ?? '',
  stateOrProvince: location.stateOrProvince ?? '',
  zipCode: location.zipCode ?? '',
  country: location.country,
});

export const loadImageAdmin = (image: Image): ImageAdmin => ({
  id: image.id,
  entityId: image.entityId,
  blobPathId: image.blobPathId,
  fileName: image.fileName,
  state: image.state,
  order: image.order,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title ?? '',
  seoDescription: image.seoDescription ?? '',
  seoKeywords: image.seoKeywords ?? '',
  dateCreated: image.dateCreated ?? '',
  datePublished: image.datePublished ?? '',
  isThreeSixty: image.isThreeSixty,
});

export const loadImageMinimal = (image: Image): ImageMinimalDto => {
  return {
    id: image.id,
    entityId: image.entityId,
    fileName: image.fileName,
    order: image.order,
    title: image.title,
    isThreeSixty: image.isThreeSixty,
  };
};

export const loadImage = (image: Image): ImageDto => {
  return {
    id: image.id,
    entityId: image.entityId,
    fileName: image.fileName,
    order: image.order,
    title: image.title,
    seoDescription: image.seoDescription,
    seoKeywords: image.seoKeywords,
    isThreeSixty: image.isThreeSixty,
  };
};

export const reloadImageDimension = (
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

export const reloadVideo = (video: Video): Video => {
  return {
    id: video.id,
    entityId: video.entityId,
    blobPathId: video.blobPathId,
    fileName: video.fileName,
  };
};
