import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityFindAllPublicResponse,
  EntityFindOnePublicResponse,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  findAllPublicEntities$,
  findPublicEntityById$,
} from '../entities/entity-repository.functions';
import {
  loadEntityMinimalPublic,
  loadEntityPublic,
} from '../entities/entity-load-public.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import {
  loadEventJsonLdNewsArticle,
  loadEventsJsonLdList,
} from '../entities/entity-json-ld.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class EntityFindPublicProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  findAllPublicEntities$(
    entityType: EntityType
  ): Observable<EntityFindAllPublicResponse> {
    return findAllPublicEntities$(entityType, this.entityModel).pipe(
      map((documentModels) => ({
        entityType,
        minimalPublicEntities:
          documentModels.length === 0
            ? []
            : documentModels.map(loadEntityMinimalPublic),
        eventsJsonLdList:
          entityType === EntityType.Event
            ? JSON.stringify(loadEventsJsonLdList(documentModels))
            : undefined,
      }))
    );
  }

  findOnePublicEntity$(
    entityId: string
  ): Observable<EntityFindOnePublicResponse> {
    return findPublicEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      map((documentModel) => ({
        publicEntity: loadEntityPublic(documentModel),
        eventJsonLdNewsArticle:
          documentModel.type === EntityType.Event
            ? JSON.stringify(
                loadEventJsonLdNewsArticle(
                  documentModel,
                  this.configProvider.production
                )
              )
            : undefined,
      }))
    );
  }
}
