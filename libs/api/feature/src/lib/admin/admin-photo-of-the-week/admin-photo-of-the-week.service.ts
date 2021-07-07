import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';

import {
  PhotoOfTheWeek,
  EntityType,
  PhotoOfTheWeekCreate,
  PhotoOfTheWeekUpdate,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { map, switchMapTo } from 'rxjs/operators';

@Injectable()
export class AdminPhotoOfTheWeekService {
  constructor(
    @InjectModel(Document.name)
    private readonly photoOfTheWeekModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  create$(
    photoOfTheWeekCreate: PhotoOfTheWeekCreate
  ): Observable<PhotoOfTheWeek> {
    return this.entityProvider.create$(
      EntityType.PhotoOfTheWeek,
      photoOfTheWeekCreate.group,
      photoOfTheWeekCreate.slug,
      this.photoOfTheWeekModel
    ) as Observable<PhotoOfTheWeek>;
  }

  update$(
    id: string,
    photoOfTheWeekUpdate: PhotoOfTheWeekUpdate
  ): Observable<PhotoOfTheWeek> {
    return from(this.photoOfTheWeekModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      switchMapTo(
        this.photoOfTheWeekModel.findByIdAndUpdate(id, {
          ...photoOfTheWeekUpdate,
        })
      ),
      switchMapTo(
        this.entityProvider.findOne$(
          EntityType.PhotoOfTheWeek,
          id,
          this.photoOfTheWeekModel
        ) as Observable<PhotoOfTheWeek>
      )
    );
  }

  post$(id: string): Observable<void> {
    throw new NotImplementedException();
  }

  findAll$(): Observable<PhotoOfTheWeek[]> {
    return this.entityProvider.findAll$(
      EntityType.PhotoOfTheWeek,
      this.photoOfTheWeekModel
    ) as Observable<PhotoOfTheWeek[]>;
  }

  findOne$(id: string): Observable<PhotoOfTheWeek> {
    return this.entityProvider.findOne$(
      EntityType.PhotoOfTheWeek,
      id,
      this.photoOfTheWeekModel
    ) as Observable<PhotoOfTheWeek>;
  }

  delete$(id: string): Observable<void> {
    return this.entityProvider.delete$(
      EntityType.PhotoOfTheWeek,
      id,
      this.photoOfTheWeekModel
    );
  }
}
