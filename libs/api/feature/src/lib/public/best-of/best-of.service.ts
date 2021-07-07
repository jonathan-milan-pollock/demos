import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BestOf, BestOfType } from '@dark-rush-photography/shared/types';
import {
  Document,
  DocumentModel,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class BestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  findOne$(bestOfType: BestOfType): Observable<BestOf> {
    return this.entityProvider
      .findAllPublic$(
        this.entityProvider.getEntityTypeFromBestOfType(bestOfType),
        this.bestOfModel
      )
      .pipe(map(this.entityProvider.validateOneEntity)) as Observable<BestOf>;
  }
}
