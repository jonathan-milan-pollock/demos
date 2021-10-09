import { v4 as uuidv4 } from 'uuid';

import {
  Image,
  ImageState,
  ImageUpdate,
  Resolution,
  ThreeSixtyImageAdd,
} from '@dark-rush-photography/shared/types';

export const loadAddImage = (
  entityId: string,
  storageId: string,
  fileName: string,
  state: ImageState,
  order: number
): Image => ({
  id: uuidv4(),
  entityId,
  storageId,
  fileName,
  state,
  order,
  isStarred: false,
  isLoved: false,
  smallResolution: { width: 0, height: 0 },
  isThreeSixty: false,
});

export const loadAddThreeSixtyImage = (
  entityId: string,
  threeSixtyImageCreate: ThreeSixtyImageAdd
): Image => ({
  id: uuidv4(),
  entityId,
  storageId: threeSixtyImageCreate.storageId,
  fileName: threeSixtyImageCreate.fileName,
  state: ImageState.Selected,
  order: 0,
  isStarred: false,
  isLoved: false,
  smallResolution: { width: 0, height: 0 },
  isThreeSixty: true,
});

export const loadUpdateImage = (
  image: Image,
  imageUpdate: ImageUpdate
): Image => ({
  id: image.id,
  entityId: image.entityId,
  storageId: image.storageId,
  fileName: image.fileName,
  state: image.state,
  order: imageUpdate.order,
  isStarred: imageUpdate.isStarred,
  isLoved: imageUpdate.isLoved,
  title: imageUpdate.title,
  seoDescription: imageUpdate.seoDescription,
  seoKeywords: imageUpdate.seoKeywords.join(','),
  dateCreated: image.dateCreated,
  datePublished: image.datePublished,
  smallResolution: image.smallResolution,
  isThreeSixty: image.isThreeSixty,
});

export const loadUpdateImageDateCreated = (
  image: Image,
  dateCreated: Date
): Image => ({
  id: image.id,
  entityId: image.entityId,
  storageId: image.storageId,
  fileName: image.fileName,
  state: image.state,
  order: image.order,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title,
  seoDescription: image.seoDescription,
  seoKeywords: image.seoKeywords,
  dateCreated: dateCreated.toISOString(),
  datePublished: image.datePublished,
  smallResolution: image.smallResolution,
  isThreeSixty: image.isThreeSixty,
});

export const loadUpdateImageSmallResolution = (
  image: Image,
  smallResolution: Resolution
): Image => ({
  id: image.id,
  entityId: image.entityId,
  storageId: image.storageId,
  fileName: image.fileName,
  state: image.state,
  order: image.order,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title,
  seoDescription: image.seoDescription,
  seoKeywords: image.seoKeywords,
  dateCreated: image.dateCreated,
  datePublished: image.datePublished,
  smallResolution,
  isThreeSixty: image.isThreeSixty,
});

export const loadUpdateImageState = (
  previousImage: Image,
  newImageId: string,
  newState: ImageState
): Image => ({
  id: newImageId,
  entityId: previousImage.entityId,
  storageId: previousImage.storageId,
  fileName: previousImage.fileName,
  state: newState,
  order: previousImage.order,
  isStarred: previousImage.isStarred,
  isLoved: previousImage.isLoved,
  title: previousImage.title,
  seoDescription: previousImage.seoDescription,
  seoKeywords: previousImage.seoKeywords,
  dateCreated: previousImage.dateCreated,
  datePublished: previousImage.datePublished,
  smallResolution: previousImage.smallResolution,
  isThreeSixty: previousImage.isThreeSixty,
});

export const loadPublishImage = (
  image: Image,
  publishFileName: string,
  datePublished: Date
): Image => ({
  id: image.id,
  entityId: image.entityId,
  storageId: image.storageId,
  fileName: publishFileName,
  state: ImageState.Public,
  order: image.order,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title,
  seoDescription: image.seoDescription,
  seoKeywords: image.seoKeywords,
  dateCreated: image.dateCreated,
  datePublished: datePublished.toISOString(),
  smallResolution: image.smallResolution,
  isThreeSixty: image.isThreeSixty,
});
