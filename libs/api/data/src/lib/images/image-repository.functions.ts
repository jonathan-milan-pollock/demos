/* istanbul ignore file */
import { from, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  Image,
  ImageState,
  ImageUpdate,
  Resolution,
  ImageVideo,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadPublishImage,
  loadUpdateImage,
  loadUpdateImageCreatedDate,
  loadUpdateImageOrder,
  loadUpdateImageSmallResolution,
  loadUpdateImageState,
} from './image-load-document-model.functions';

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

export const updateImageOrder$ = (
  image: Image,
  order: number,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  const imageId = image.id;
  return from(
    entityModel.findByIdAndUpdate(image.entityId, {
      images: [
        ...documentModel.images.filter((image) => image.id !== imageId),
        {
          ...loadUpdateImageOrder(image, order),
        },
      ],
    })
  );
};

export const updateImageCreatedDate$ = (
  image: Image,
  createdDate: string,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  const imageId = image.id;
  return from(
    entityModel.findByIdAndUpdate(image.entityId, {
      images: [
        ...documentModel.images.filter((image) => image.id !== imageId),
        {
          ...loadUpdateImageCreatedDate(image, createdDate),
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
          ...loadUpdateImageState(previousImage, newState),
        },
      ],
    })
  );
};

export const publishImage$ = (
  image: Image,
  publishFileName: string,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  const imageId = image.id;
  return from(
    entityModel.findByIdAndUpdate(image.entityId, {
      images: [
        ...documentModel.images.filter((image) => image.id !== imageId),
        {
          ...loadPublishImage(image, publishFileName),
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

export const addImageVideo$ = (
  imageVideo: ImageVideo,
  entityId: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  return from(
    entityModel.findByIdAndUpdate(entityId, {
      imageVideo: { ...imageVideo },
    })
  );
};

export const publishImageVideo$ = (
  imageVideo: ImageVideo,
  entityId: string,
  publishFileName: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  return from(
    entityModel.findByIdAndUpdate(entityId, {
      imageVideo: { ...imageVideo, fileName: publishFileName },
    })
  );
};

export const removeImageVideo$ = (
  entityId: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  return from(
    entityModel.findByIdAndUpdate(entityId, {
      imageVideo: undefined,
    })
  );
};
