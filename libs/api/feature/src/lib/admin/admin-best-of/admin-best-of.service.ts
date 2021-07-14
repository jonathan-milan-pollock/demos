import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BestOf, BestOfType } from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/shared-server/types';
import {
  Document,
  DocumentModel,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminBestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  create$(bestOfType: BestOfType): Observable<BestOf> {
    return this.entityProvider.create$(
      this.entityProvider.getEntityTypeFromBestOfType(bestOfType),
      DEFAULT_ENTITY_GROUP,
      bestOfType,
      this.bestOfModel
    ) as Observable<BestOf>;
  }

  findOne$(bestOfType: BestOfType): Observable<BestOf> {
    return this.entityProvider
      .findAll$(
        this.entityProvider.getEntityTypeFromBestOfType(bestOfType),
        this.bestOfModel
      )
      .pipe(map(this.entityProvider.validateOneEntity)) as Observable<BestOf>;
  }

  delete$(bestOfType: BestOfType, id: string): Observable<void> {
    return this.entityProvider.delete$(
      this.entityProvider.getEntityTypeFromBestOfType(bestOfType),
      id,
      this.bestOfModel
    );
  }
}
