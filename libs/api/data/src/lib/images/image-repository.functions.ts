/* istanbul ignore file */
import { from, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  Image,
  ImageState,
  ImageUpdate,
  Dimension,
  ImageVideo,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadUpdateImage,
  loadUpdateImageCreatedDate,
  loadUpdateImageOrder,
  loadUpdateImageSmallDimension,
  loadUpdateImageState,
} from './image-load-document-model.functions';

export const addImage$ = (
  image: Image,
  entityId: string,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(
    entityModel.findByIdAndUpdate(entityId, {
      images: [...documentModel.images, { ...image }],
    })
  );

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

export const updateImageState$ = (
  image: Image,
  state: ImageState,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  const imageId = image.id;
  return from(
    entityModel.findByIdAndUpdate(image.entityId, {
      images: [
        ...documentModel.images.filter((image) => image.id !== imageId),
        {
          ...loadUpdateImageState(image, state),
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

export const updateImageSmallDimension$ = (
  image: Image,
  resolution: Dimension,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  const imageId = image.id;
  return from(
    entityModel.findByIdAndUpdate(image.entityId, {
      images: [
        ...documentModel.images.filter((image) => image.id !== imageId),
        {
          ...loadUpdateImageSmallDimension(image, resolution),
        },
      ],
    })
  );
};

export const removeImage$ = (
  imageId: string,
  entityId: string,
  documentModel: DocumentModel,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(
    entityModel.findByIdAndUpdate(entityId, {
      images: [...documentModel.images.filter((image) => image.id !== imageId)],
    })
  );

export const addImageVideo$ = (
  imageVideo: ImageVideo,
  entityId: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(
    entityModel.findByIdAndUpdate(entityId, {
      imageVideo: { ...imageVideo },
    })
  );

export const removeImageVideo$ = (
  entityId: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> =>
  from(
    entityModel.findByIdAndUpdate(entityId, {
      imageVideo: undefined,
    })
  );
