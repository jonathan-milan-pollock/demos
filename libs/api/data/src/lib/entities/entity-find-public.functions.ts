import { concatMap, from, last, map, Observable, of, toArray } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityMinimalPublic,
  EntityPublic,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadDocumentModelsArray } from './entity-load-document-model.functions';
import {
  loadEntityMinimalPublic,
  loadEntityPublic,
} from './entity-load-public.functions';
import {
  validateEntityFound,
  validateEntityIsPublic,
  validateEntityType,
} from './entity-validation.functions';

export const findAllPublic$ = (
  entityType: EntityType,
  entityModel: Model<DocumentModel>
): Observable<EntityMinimalPublic[]> => {
  return from(entityModel.find({ type: entityType, isPublic: true })).pipe(
    map(loadDocumentModelsArray),
    concatMap((documentModels) => {
      if (documentModels.length === 0) return of([]);

      return from(documentModels).pipe(
        map((documentModel) => loadEntityMinimalPublic(documentModel)),
        last(),
        toArray<EntityMinimalPublic>()
      );
    })
  );
};

export const findOnePublic$ = (
  entityType: EntityType,
  entityId: string,
  entityModel: Model<DocumentModel>
): Observable<EntityPublic> => {
  return from(entityModel.findById(entityId)).pipe(
    map(validateEntityFound),
    map(validateEntityIsPublic),
    map((documentModel) => validateEntityType(entityType, documentModel)),
    map((documentModel) => loadEntityPublic(documentModel))
  );
};
