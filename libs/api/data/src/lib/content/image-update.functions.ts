import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { ImageUpdate, Resolution } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { validateImageFoundInEntity } from '../content/content-validation.functions';

export const updateImage$ = (
  imageId: string,
  entityId: string,
  imageUpdate: ImageUpdate,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  return from(entityModel.findById(entityId)).pipe(
    map(validateEntityFound),
    map((documentModel) => ({
      documentModel,
      foundImage: validateImageFoundInEntity(imageId, documentModel),
    })),
    concatMap(({ documentModel, foundImage }) =>
      from(
        entityModel.findByIdAndUpdate(entityId, {
          images: [
            ...documentModel.images.filter((image) => image.id !== imageId),
            {
              id: imageId,
              entityId,
              state: foundImage.state,
              storageId: foundImage.storageId,
              fileName: foundImage.fileName,
              order: imageUpdate.order,
              isStarred: imageUpdate.isStarred,
              isLoved: imageUpdate.isLoved,
              title: imageUpdate.title,
              seoDescription: imageUpdate.seoDescription,
              seoKeywords: imageUpdate.seoKeywords.join(','),
              dateCreated: imageUpdate.dateCreated,
              datePublished: imageUpdate.datePublished,
              smallResolution: foundImage.smallResolution,
              isThreeSixty: foundImage.isThreeSixty,
            },
          ],
        })
      )
    )
  );
};

export const updateSmallImageDimension$ = (
  imageId: string,
  entityId: string,
  smallResolution: Resolution,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  return from(entityModel.findById(entityId)).pipe(
    map(validateEntityFound),
    map((documentModel) => ({
      documentModel,
      foundImage: validateImageFoundInEntity(imageId, documentModel),
    })),
    concatMap(({ documentModel, foundImage }) =>
      from(
        entityModel.findByIdAndUpdate(entityId, {
          images: [
            ...documentModel.images.filter((image) => image.id !== imageId),
            {
              id: imageId,
              entityId,
              state: foundImage.state,
              storageId: foundImage.storageId,
              fileName: foundImage.fileName,
              order: foundImage.order,
              isStarred: foundImage.isStarred,
              isLoved: foundImage.isLoved,
              title: foundImage.title,
              seoDescription: foundImage.seoDescription,
              seoKeywords: foundImage.seoKeywords,
              dateCreated: foundImage.dateCreated,
              datePublished: foundImage.datePublished,
              smallResolution,
              isThreeSixty: foundImage.isThreeSixty,
            },
          ],
        })
      )
    )
  );
};
