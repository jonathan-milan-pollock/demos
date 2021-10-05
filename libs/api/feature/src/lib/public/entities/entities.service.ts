import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityMinimalPublic,
  EntityPublic,
  EntityType,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  findAllPublic$,
  findOnePublic$,
} from '@dark-rush-photography/api/data';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  findAll$(entityType: EntityType): Observable<EntityMinimalPublic[]> {
    return findAllPublic$(entityType, this.entityModel);
  }

  findOne$(entityType: EntityType, entityId: string): Observable<EntityPublic> {
    return findOnePublic$(entityType, entityId, this.entityModel);
  }
}
