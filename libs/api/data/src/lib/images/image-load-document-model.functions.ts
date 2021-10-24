import { v4 as uuidv4 } from 'uuid';

import {
  Image,
  ImageState,
  ImageUpdate,
  Resolution,
  ThreeSixtyImageAdd,
} from '@dark-rush-photography/shared/types';

export const loadNewImage = (
  entityId: string,
  fileName: string,
  order: number
): Image => ({
  id: uuidv4(),
  entityId,
  storageId: uuidv4(),
  fileName,
  state: ImageState.New,
  isThreeSixty: false,
  order,
  isStarred: false,
  isLoved: false,
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
  isThreeSixty: true,
  order: 0,
  isStarred: false,
  isLoved: false,
});

export const loadAddImagePostImage = (entityId: string): Image => ({
  id: uuidv4(),
  entityId,
  storageId: uuidv4(),
  fileName: `${uuidv4()}.jpg`,
  state: ImageState.Selected,
  isThreeSixty: false,
  order: 0,
  isStarred: true,
  isLoved: false,
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
  isThreeSixty: image.isThreeSixty,
  order: image.order,
  isStarred: imageUpdate.isStarred,
  isLoved: imageUpdate.isLoved,
  title: imageUpdate.title,
  createdDate: image.createdDate,
  seoDescription: imageUpdate.seoDescription,
  seoKeywords: imageUpdate.seoKeywords.join(','),
  smallResolution: image.smallResolution,
});

export const loadUpdateImageOrder = (image: Image, order: number): Image => ({
  id: image.id,
  entityId: image.entityId,
  storageId: image.storageId,
  fileName: image.fileName,
  state: image.state,
  isThreeSixty: image.isThreeSixty,
  order,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title,
  createdDate: image.createdDate,
  seoDescription: image.seoDescription,
  seoKeywords: image.seoKeywords,
  smallResolution: image.smallResolution,
});

export const loadUpdateImageCreatedDate = (
  image: Image,
  createdDate: string
): Image => ({
  id: image.id,
  entityId: image.entityId,
  storageId: image.storageId,
  fileName: image.fileName,
  state: image.state,
  isThreeSixty: image.isThreeSixty,
  order: image.order,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title,
  createdDate: createdDate,
  seoDescription: image.seoDescription,
  seoKeywords: image.seoKeywords,
  smallResolution: image.smallResolution,
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
  isThreeSixty: image.isThreeSixty,
  order: image.order,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title,
  createdDate: image.createdDate,
  seoDescription: image.seoDescription,
  seoKeywords: image.seoKeywords,
  smallResolution,
});

export const loadUpdateImageState = (
  previousImage: Image,
  newState: ImageState
): Image => ({
  id: uuidv4(),
  entityId: previousImage.entityId,
  storageId: previousImage.storageId,
  fileName: previousImage.fileName,
  state: newState,
  isThreeSixty: previousImage.isThreeSixty,
  order: previousImage.order,
  isStarred: previousImage.isStarred,
  isLoved: previousImage.isLoved,
  title: previousImage.title,
  createdDate: previousImage.createdDate,
  seoDescription: previousImage.seoDescription,
  seoKeywords: previousImage.seoKeywords,
  smallResolution: previousImage.smallResolution,
});

export const loadPublishImage = (
  image: Image,
  publishFileName: string
): Image => ({
  id: uuidv4(),
  entityId: image.entityId,
  storageId: image.storageId,
  fileName: publishFileName,
  state: ImageState.Public,
  isThreeSixty: image.isThreeSixty,
  order: image.order,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title,
  createdDate: image.createdDate,
  seoDescription: image.seoDescription,
  seoKeywords: image.seoKeywords,
  smallResolution: image.smallResolution,
});
