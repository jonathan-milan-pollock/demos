import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, last, map, Observable, of, toArray } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityMinimalPublic,
  EntityPublic,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  findAllPublicEntities$,
  findEntityById$,
} from '../entities/entity-repository.functions';
import {
  loadEntityMinimalPublic,
  loadEntityPublic,
} from '../entities/entity-load-public.functions';
import {
  validateEntityFound,
  validateEntityIsPublic,
  validateEntityType,
} from '../entities/entity-validation.functions';

@Injectable()
export class EntityFindPublicProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  findAllPublicEntities$(
    entityType: EntityType
  ): Observable<EntityMinimalPublic[]> {
    return findAllPublicEntities$(entityType, this.entityModel).pipe(
      concatMap((documentModels) => {
        if (documentModels.length === 0) return of([]);

        return from(documentModels).pipe(
          map((documentModel) => loadEntityMinimalPublic(documentModel)),
          last(),
          toArray<EntityMinimalPublic>()
        );
      })
    );
  }

  findOnePublicEntity$(
    entityType: EntityType,
    entityId: string
  ): Observable<EntityPublic> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      map(validateEntityIsPublic),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map((documentModel) => loadEntityPublic(documentModel))
    );
  }
}
