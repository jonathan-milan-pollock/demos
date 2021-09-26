import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Observable, toArray } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import { AboutDto } from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  EntityFindAllPublicProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(Document.name)
    private readonly aboutModel: Model<DocumentModel>,
    private readonly entityPublicProvider: EntityFindAllPublicProvider
  ) {}

  findAll$(): Observable<AboutDto[]> {
    return this.entityPublicProvider
      .findAllPublic$(EntityType.About, this.aboutModel)
      .pipe(toArray<AboutDto>());
  }
}
