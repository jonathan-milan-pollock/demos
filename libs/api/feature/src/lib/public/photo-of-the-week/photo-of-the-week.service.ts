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
  EntityPublicProvider,
  PhotoOfTheWeekProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class PhotoOfTheWeekService {
  constructor(
    @InjectModel(Document.name)
    private readonly photoOfTheWeekModel: Model<DocumentModel>,
    private readonly entityProvider: EntityPublicProvider,
    private readonly photoOfTheWeekProvider: PhotoOfTheWeekProvider
  ) {}

  findAll$(): Observable<PhotoOfTheWeekMinimalDto[]> {
    return this.entityProvider
      .findAllPublic$(EntityType.PhotoOfTheWeek, this.photoOfTheWeekModel)
      .pipe(
        map(this.photoOfTheWeekProvider.loadMinimalPhotoOfTheWeekPublic),
        toArray<PhotoOfTheWeekMinimalDto>()
      );
  }

  findOne$(id: string): Observable<PhotoOfTheWeekDto> {
    return this.entityProvider
      .findOnePublic$(EntityType.PhotoOfTheWeek, id, this.photoOfTheWeekModel)
      .pipe(map(this.photoOfTheWeekProvider.loadPhotoOfTheWeekPublic));
  }
}
