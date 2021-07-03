import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import { About, EntityType } from '@dark-rush-photography/shared/types';
import {
  Document,
  DocumentModel,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(Document.name)
    private readonly aboutModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  findAll$(): Observable<About[]> {
    return this.entityProvider.findAllPublic$(
      EntityType.About,
      this.aboutModel
    ) as Observable<About[]>;
  }

  findOne$(id: string): Observable<About> {
    return this.entityProvider.findOnePublic$(
      EntityType.About,
      id,
      this.aboutModel
    ) as Observable<About>;
  }
}
