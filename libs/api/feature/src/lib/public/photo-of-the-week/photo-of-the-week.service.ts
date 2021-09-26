import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable, toArray } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import {
  PhotoOfTheWeekMinimalDto,
  PhotoOfTheWeekDto,
} from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityFindAllPublicProvider,
  EntityFindOnePublicProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class PhotoOfTheWeekService {
  constructor(
    @InjectModel(Document.name)
    private readonly photoOfTheWeekModel: Model<DocumentModel>,
    private readonly entityFindAllPublicProvider: EntityFindAllPublicProvider,
    private readonly entityFindOnePublicProvider: EntityFindOnePublicProvider
  ) {}

  findAll$(): Observable<PhotoOfTheWeekMinimalDto[]> {
    return this.entityFindAllPublicProvider
      .findAllPublic$(EntityType.PhotoOfTheWeek, this.photoOfTheWeekModel)
      .pipe(toArray<PhotoOfTheWeekMinimalDto>());
  }

  findOne$(id: string): Observable<PhotoOfTheWeekDto> {
    return this.entityFindOnePublicProvider.findOnePublic$(
      EntityType.PhotoOfTheWeek,
      id,
      this.photoOfTheWeekModel
    );
  }
}
