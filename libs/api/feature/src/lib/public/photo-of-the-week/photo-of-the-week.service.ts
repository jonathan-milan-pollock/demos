import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { map, Observable, toArray } from 'rxjs';

import {
  EntityType,
  PhotoOfTheWeekMinimalDto,
  PhotoOfTheWeekDto,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityLoadProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class PhotoOfTheWeekService {
  constructor(
    @InjectModel(Document.name)
    private readonly photoOfTheWeekModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly entityLoadProvider: EntityLoadProvider
  ) {}

  findAll$(): Observable<PhotoOfTheWeekMinimalDto[]> {
    return this.entityProvider
      .findAllPublic$(EntityType.PhotoOfTheWeek, this.photoOfTheWeekModel)
      .pipe(
        map(this.entityLoadProvider.loadMinimalPhotoOfTheWeekPublic),
        toArray<PhotoOfTheWeekMinimalDto>()
      );
  }

  findOne$(id: string): Observable<PhotoOfTheWeekDto> {
    return this.entityProvider
      .findOnePublic$(EntityType.PhotoOfTheWeek, id, this.photoOfTheWeekModel)
      .pipe(map(this.entityLoadProvider.loadPhotoOfTheWeekPublic));
  }
}
