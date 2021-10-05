import {
  Image,
  ImageAdmin,
  ImagePublic,
  Location,
  LocationDefined,
  Video,
} from '@dark-rush-photography/shared/types';

export const loadLocation = (location: Location): LocationDefined => ({
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
  storageId: image.storageId,
  fileName: image.fileName,
  state: image.state,
  order: image.order,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title ?? '',
  seoDescription: image.seoDescription ?? '',
  seoKeywords: image.seoKeywords ? image.seoKeywords.split(',') : [],
  dateCreated: image.dateCreated ?? '',
  datePublished: image.datePublished ?? '',
  smallResolution: image.smallResolution,
  isThreeSixty: image.isThreeSixty,
});

export const loadImagePublic = (image: Image): ImagePublic => {
  return {
    fileName: image.fileName,
    storageId: image.storageId,
    order: image.order,
    title: image.title ?? '',
    seoDescription: image.seoDescription ?? '',
    seoKeywords: image.seoKeywords ? image.seoKeywords.split(',') : [],
    dateCreated: image.dateCreated ?? '',
    datePublished: image.datePublished ?? '',
    smallResolution: image.smallResolution,
    isThreeSixty: image.isThreeSixty,
  };
};

export const loadVideo = (video: Video): Video => {
  return {
    id: video.id,
    entityId: video.entityId,
    storageId: video.storageId,
    fileName: video.fileName,
  };
};
