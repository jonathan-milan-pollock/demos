import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { map, Observable, toArray } from 'rxjs';

import { BestOfDto, BestOfType } from '@dark-rush-photography/shared/types';
import {
  BestOfProvider,
  Document,
  DocumentModel,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class BestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly bestOfProvider: BestOfProvider,
    private readonly entityProvider: EntityProvider
  ) {}

  findOne$(bestOfType: BestOfType): Observable<BestOfDto> {
    const entityType =
      this.bestOfProvider.getEntityTypeFromBestOfType(bestOfType);
    return this.entityProvider
      .findAllPublic$(entityType, this.bestOfModel)
      .pipe(
        toArray<DocumentModel>(),
        map(this.entityProvider.validateOneEntity),
        map(this.bestOfProvider.loadBestOfPublic)
      );
  }
}
