import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { map, Observable, toArray } from 'rxjs';

import { EntityType } from '@dark-rush-photography/shared/types';
import { BestOfDto } from '@dark-rush-photography/api/types';
import {
  BestOfProvider,
  Document,
  DocumentModel,
  EntityPublicProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class BestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly entityProvider: EntityPublicProvider,
    private readonly bestOfProvider: BestOfProvider
  ) {}

  findAll$(): Observable<BestOfDto[]> {
    return this.entityProvider
      .findAllPublic$(EntityType.BestOf, this.bestOfModel)
      .pipe(map(this.bestOfProvider.loadBestOfPublic), toArray<BestOfDto>());
  }
}
