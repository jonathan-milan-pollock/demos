import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import {
  PhotoOfTheWeek,
  EntityType,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class PhotoOfTheWeekService {
  constructor(
    @InjectModel(Document.name)
    private readonly photoOfTheWeekModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  findAll$(): Observable<PhotoOfTheWeek[]> {
    return this.entityProvider.findAllPublic$(
      EntityType.PhotoOfTheWeek,
      this.photoOfTheWeekModel
    ) as Observable<PhotoOfTheWeek[]>;
  }

  findOne$(id: string): Observable<PhotoOfTheWeek> {
    return this.entityProvider.findOnePublic$(
      EntityType.PhotoOfTheWeek,
      id,
      this.photoOfTheWeekModel
    ) as Observable<PhotoOfTheWeek>;
  }
}
