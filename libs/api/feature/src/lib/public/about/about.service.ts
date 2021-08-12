import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { map, Observable, toArray } from 'rxjs';

import { AboutDto, EntityType } from '@dark-rush-photography/shared/types';
import {
  Document,
  DocumentModel,
  EntityLoadProvider,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(Document.name)
    private readonly aboutModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly entityLoadProvider: EntityLoadProvider
  ) {}

  findAll$(): Observable<AboutDto[]> {
    return this.entityProvider
      .findAllPublic$(EntityType.About, this.aboutModel)
      .pipe(map(this.entityLoadProvider.loadAboutPublic), toArray<AboutDto>());
  }
}
