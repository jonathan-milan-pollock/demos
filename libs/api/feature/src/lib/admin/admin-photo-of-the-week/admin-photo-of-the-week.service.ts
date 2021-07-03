import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

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
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminPhotoOfTheWeekService {
  constructor(
    @InjectModel(Document.name)
    private readonly photoOfTheWeekModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly serverlessEntityProvider: ServerlessEntityProvider
  ) {}

  create$(
    photoOfTheWeekCreate: PhotoOfTheWeekCreate
  ): Observable<PhotoOfTheWeek> {
    return this.entityProvider.create$(
      EntityType.PhotoOfTheWeek,
      photoOfTheWeekCreate.slug,
      this.photoOfTheWeekModel,
      photoOfTheWeekCreate.group
    ) as Observable<PhotoOfTheWeek>;
  }

  updateProcess$(
    id: string,
    photoOfTheWeekUpdate: PhotoOfTheWeekUpdate
  ): Observable<void> {
    return this.serverlessEntityProvider.updateProcess$(
      EntityType.PhotoOfTheWeek,
      id,
      this.photoOfTheWeekModel,
      {
        ...photoOfTheWeekUpdate,
        hasExtendedReality: false,
        socialMediaUrls: [],
      }
    );
  }

  postProcess$(id: string): Observable<void> {
    return this.serverlessEntityProvider.postProcess$(
      EntityType.PhotoOfTheWeek,
      id,
      this.photoOfTheWeekModel
    );
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

  deleteProcess$(id: string): Observable<void> {
    return this.serverlessEntityProvider.deleteProcess$(
      EntityType.PhotoOfTheWeek,
      id,
      this.photoOfTheWeekModel
    );
  }
}
