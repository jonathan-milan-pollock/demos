import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable, toArray } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import { AboutDto } from '@dark-rush-photography/api/types';
import {
  AboutProvider,
  Document,
  DocumentModel,
  EntityPublicProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(Document.name)
    private readonly aboutModel: Model<DocumentModel>,
    private readonly entityProvider: EntityPublicProvider,
    private readonly aboutProvider: AboutProvider
  ) {}

  findAll$(): Observable<AboutDto[]> {
    return this.entityProvider
      .findAllPublic$(EntityType.About, this.aboutModel)
      .pipe(map(this.aboutProvider.loadAboutPublic), toArray<AboutDto>());
  }
}
