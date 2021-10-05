import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { ImageState } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { validateImageFoundInEntity } from './content-validation.functions';

export const changeState$ = (
  previousImageId: string,
  entityId: string,
  newState: ImageState,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel> => {
  return from(entityModel.findById(entityId)).pipe(
    map(validateEntityFound),
    concatMap((documentModel) => {
      const foundImage = validateImageFoundInEntity(
        previousImageId,
        documentModel
      );
      const newImageId = uuidv4();
      return from(
        entityModel.findByIdAndUpdate(entityId, {
          images: [
            ...documentModel.images.filter(
              (image) => image.id !== previousImageId
            ),
            {
              id: newImageId,
              entityId,
              state: newState,
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
              smallResolution: foundImage.smallResolution,
              isThreeSixty: foundImage.isThreeSixty,
            },
          ],
        })
      );
    }),
    concatMap(() => from(entityModel.findById(entityId))),
    map(validateEntityFound)
  );
};
