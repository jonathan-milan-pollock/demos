import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { map, Observable, toArray } from 'rxjs';

import { AboutDto, EntityType } from '@dark-rush-photography/shared/types';
import {
  AboutProvider,
  Document,
  DocumentModel,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(Document.name)
    private readonly aboutModel: Model<DocumentModel>,
    private readonly aboutProvider: AboutProvider,
    private readonly entityProvider: EntityProvider
  ) {}

  findAll$(): Observable<AboutDto[]> {
    return this.entityProvider
      .findAllPublic$(EntityType.About, this.aboutModel)
      .pipe(map(this.aboutProvider.loadAboutPublic), toArray<AboutDto>());
  }
}
