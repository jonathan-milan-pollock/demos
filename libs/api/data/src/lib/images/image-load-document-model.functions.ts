import { v4 as uuidv4 } from 'uuid';

import {
  Dimension,
  Image,
  ImageState,
  ImageUpdate,
} from '@dark-rush-photography/shared/types';

export const loadNewImage = (
  entityId: string,
  slug: string,
  order: number
): Image => ({
  id: uuidv4(),
  entityId,
  storageId: uuidv4(),
  slug,
  order,
  state: ImageState.New,
  isThreeSixtyImage: false,
  isStarred: false,
  isLoved: false,
});

export const loadAddImagePostImage = (
  entityId: string,
  slug: string
): Image => ({
  id: uuidv4(),
  entityId,
  storageId: uuidv4(),
  slug,
  order: 0,
  state: ImageState.Selected,
  isThreeSixtyImage: false,
  isStarred: false,
  isLoved: false,
});

export const loadAddTestImage = (entityId: string, slug: string): Image => ({
  id: uuidv4(),
  entityId,
  storageId: uuidv4(),
  slug,
  order: 0,
  state: ImageState.New,
  isThreeSixtyImage: false,
  isStarred: false,
  isLoved: false,
});

export const loadUpdateImage = (
  image: Image,
  imageUpdate: ImageUpdate
): Image => ({
  id: image.id,
  entityId: image.entityId,
  storageId: image.storageId,
  slug: image.slug,
  order: image.order,
  state: imageUpdate.state,
  isThreeSixtyImage: imageUpdate.isThreeSixtyImage,
  threeSixtyImageStorageId: imageUpdate.threeSixtyImageStorageId,
  isStarred: imageUpdate.isStarred,
  isLoved: imageUpdate.isLoved,
  title: imageUpdate.title,
  createdDate: image.createdDate,
  seoDescription: imageUpdate.seoDescription,
  seoKeywords: imageUpdate.seoKeywords.join(','),
  smallDimension: image.smallDimension,
});

export const loadUpdateImageOrder = (image: Image, order: number): Image => ({
  id: image.id,
  entityId: image.entityId,
  storageId: image.storageId,
  slug: image.slug,
  order,
  state: image.state,
  isThreeSixtyImage: image.isThreeSixtyImage,
  threeSixtyImageStorageId: image.threeSixtyImageStorageId,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title,
  createdDate: image.createdDate,
  seoDescription: image.seoDescription,
  seoKeywords: image.seoKeywords,
  smallDimension: image.smallDimension,
});

export const loadUpdateImageState = (
  image: Image,
  state: ImageState
): Image => ({
  id: image.id,
  entityId: image.entityId,
  storageId: image.storageId,
  slug: image.slug,
  order: image.order,
  state,
  isThreeSixtyImage: image.isThreeSixtyImage,
  threeSixtyImageStorageId: image.threeSixtyImageStorageId,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title,
  createdDate: image.createdDate,
  seoDescription: image.seoDescription,
  seoKeywords: image.seoKeywords,
  smallDimension: image.smallDimension,
});

export const loadUpdateImageCreatedDate = (
  image: Image,
  createdDate: string
): Image => ({
  id: image.id,
  entityId: image.entityId,
  storageId: image.storageId,
  slug: image.slug,
  order: image.order,
  state: image.state,
  isThreeSixtyImage: image.isThreeSixtyImage,
  threeSixtyImageStorageId: image.threeSixtyImageStorageId,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title,
  createdDate,
  seoDescription: image.seoDescription,
  seoKeywords: image.seoKeywords,
  smallDimension: image.smallDimension,
});

export const loadUpdateImageSmallDimension = (
  image: Image,
  smallDimension: Dimension
): Image => ({
  id: image.id,
  entityId: image.entityId,
  storageId: image.storageId,
  slug: image.slug,
  order: image.order,
  state: image.state,
  isThreeSixtyImage: image.isThreeSixtyImage,
  threeSixtyImageStorageId: image.threeSixtyImageStorageId,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title,
  createdDate: image.createdDate,
  seoDescription: image.seoDescription,
  seoKeywords: image.seoKeywords,
  smallDimension,
});
