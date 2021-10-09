/* istanbul ignore file */
import { from, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  Image,
  ImageState,
  ImageUpdate,
  Resolution,
  Video,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadPublishImage,
  loadUpdateImage,
  loadUpdateImageDateCreated,
  loadUpdateImageSmallResolution,
  loadUpdateImageState,
} from './content-load-document-model.functions';

export const addImage$ = (
  image: Image,
  entityId: string,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  return from(
    entityModel.findByIdAndUpdate(entityId, {
      images: [...documentModel.images, { ...image }],
    })
  );
};

export const updateImage$ = (
  image: Image,
  imageUpdate: ImageUpdate,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  const imageId = image.id;
  return from(
    entityModel.findByIdAndUpdate(image.entityId, {
      images: [
        ...documentModel.images.filter((image) => image.id !== imageId),
        {
          ...loadUpdateImage(image, imageUpdate),
        },
      ],
    })
  );
};

export const updateImageDateCreated$ = (
  image: Image,
  dateCreated: Date,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  const imageId = image.id;
  return from(
    entityModel.findByIdAndUpdate(image.entityId, {
      images: [
        ...documentModel.images.filter((image) => image.id !== imageId),
        {
          ...loadUpdateImageDateCreated(image, dateCreated),
        },
      ],
    })
  );
};

export const updateImageSmallResolution$ = (
  image: Image,
  resolution: Resolution,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  const imageId = image.id;
  return from(
    entityModel.findByIdAndUpdate(image.entityId, {
      images: [
        ...documentModel.images.filter((image) => image.id !== imageId),
        {
          ...loadUpdateImageSmallResolution(image, resolution),
        },
      ],
    })
  );
};

export const updateImageState$ = (
  previousImage: Image,
  newImageId: string,
  newState: ImageState,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  const imageId = previousImage.id;
  return from(
    entityModel.findByIdAndUpdate(previousImage.entityId, {
      images: [
        ...documentModel.images.filter((image) => image.id !== imageId),
        {
          ...loadUpdateImageState(previousImage, newImageId, newState),
        },
      ],
    })
  );
};

export const publishImage$ = (
  image: Image,
  publishFileName: string,
  datePublished: Date,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  const imageId = image.id;
  return from(
    entityModel.findByIdAndUpdate(image.entityId, {
      images: [
        ...documentModel.images.filter((image) => image.id !== imageId),
        {
          ...loadPublishImage(image, publishFileName, datePublished),
        },
      ],
    })
  );
};

export const removeImage$ = (
  image: Image,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  const imageId = image.id;
  return from(
    entityModel.findByIdAndUpdate(image.entityId, {
      images: [...documentModel.images.filter((image) => image.id !== imageId)],
    })
  );
};

export const addVideo$ = (
  video: Video,
  entityId: string,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  return from(
    entityModel.findByIdAndUpdate(entityId, {
      videos: [...documentModel.videos, { ...video }],
    })
  );
};

export const removeVideo$ = (
  video: Video,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  const videoId = video.id;
  return from(
    entityModel.findByIdAndUpdate(video.entityId, {
      videos: [...documentModel.videos.filter((video) => video.id !== videoId)],
    })
  );
};
