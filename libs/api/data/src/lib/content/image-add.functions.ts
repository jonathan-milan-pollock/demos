import { Logger } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { Image, ImageState } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';

export const addImage$ = (
  entityModel: Model<DocumentModel>,
  entityId: string,
  state: ImageState,
  fileName: string,
  order: number,
  isThreeSixty: boolean
): Observable<Image> => {
  const logger = new Logger(addImage$.name);
  logger.log(`Adding ${fileName}`);

  const image: Image = {
    id: uuidv4(),
    entityId,
    state,
    storageId: uuidv4(),
    fileName,
    order,
    isStarred: false,
    isLoved: false,
    title: '',
    seoDescription: '',
    seoKeywords: '',
    smallResolution: { width: 0, height: 0 },
    isThreeSixty,
  };
  return from(entityModel.findById(entityId)).pipe(
    map(validateEntityFound),
    concatMap((documentModel) =>
      from(
        entityModel.findByIdAndUpdate(entityId, {
          images: [...documentModel.images, { ...image }],
        })
      )
    ),
    map(() => image)
  );
};
