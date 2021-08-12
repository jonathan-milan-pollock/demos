import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { map, Observable, toArray } from 'rxjs';

import { BestOfDto, EntityType } from '@dark-rush-photography/shared/types';
import {
  Document,
  DocumentModel,
  EntityLoadProvider,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class BestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly entityLoadProvider: EntityLoadProvider
  ) {}

  findAll$(): Observable<BestOfDto[]> {
    return this.entityProvider
      .findAllPublic$(EntityType.BestOf, this.bestOfModel)
      .pipe(map(this.entityLoadProvider.loadBestOfPublic), toArray<BestOfDto>());
  }
}
