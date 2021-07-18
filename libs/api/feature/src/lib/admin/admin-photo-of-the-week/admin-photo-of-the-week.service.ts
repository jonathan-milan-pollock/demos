import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { concatMapTo, from, map, Observable, toArray } from 'rxjs';

import {
  PhotoOfTheWeek,
  EntityType,
  PhotoOfTheWeekUpdateDto,
  PhotoOfTheWeekCreateDto,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityUpdateProvider,
  EntityPostProvider,
  EntityDeleteProvider,
  PhotoOfTheWeekProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminPhotoOfTheWeekService {
  constructor(
    @InjectModel(Document.name)
    private readonly photoOfTheWeekModel: Model<DocumentModel>,
    private readonly photoOfTheWeekProvider: PhotoOfTheWeekProvider,
    private readonly entityProvider: EntityProvider,
    private readonly entityUpdateProvider: EntityUpdateProvider,
    private readonly entityPostProvider: EntityPostProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider
  ) {}

  create$(
    photoOfTheWeekCreate: PhotoOfTheWeekCreateDto
  ): Observable<PhotoOfTheWeek> {
    return this.entityProvider
      .create$(
        EntityType.PhotoOfTheWeek,
        photoOfTheWeekCreate.group,
        photoOfTheWeekCreate.slug,
        this.photoOfTheWeekModel
      )
      .pipe(
        concatMapTo(
          from(
            new this.photoOfTheWeekModel({
              ...this.photoOfTheWeekProvider.loadNewPhotoOfTheWeek(
                photoOfTheWeekCreate.group,
                photoOfTheWeekCreate.slug
              ),
              type: EntityType.PhotoOfTheWeek,
            }).save()
          )
        ),
        map(this.entityProvider.validateEntityCreate),
        map(this.photoOfTheWeekProvider.loadPhotoOfTheWeek)
      );
  }

  update$(
    id: string,
    photoOfTheWeekUpdate: PhotoOfTheWeekUpdateDto
  ): Observable<PhotoOfTheWeek> {
    return from(this.photoOfTheWeekModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.PhotoOfTheWeek,
          id,
          true,
          this.photoOfTheWeekModel
        )
      ),
      concatMapTo(
        this.entityUpdateProvider.update$(
          EntityType.PhotoOfTheWeek,
          id,
          this.photoOfTheWeekModel
        )
      ),
      concatMapTo(
        this.photoOfTheWeekModel.findByIdAndUpdate(id, {
          ...photoOfTheWeekUpdate,
        })
      ),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.PhotoOfTheWeek,
          id,
          false,
          this.photoOfTheWeekModel
        )
      ),
      concatMapTo(
        this.entityProvider.findOne$(
          EntityType.PhotoOfTheWeek,
          id,
          this.photoOfTheWeekModel
        )
      ),
      concatMapTo(this.findOne$(id))
    );
  }

  post$(id: string): Observable<PhotoOfTheWeek> {
    return from(this.photoOfTheWeekModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.PhotoOfTheWeek,
          id,
          true,
          this.photoOfTheWeekModel
        )
      ),
      concatMapTo(
        this.entityPostProvider.post$(
          EntityType.PhotoOfTheWeek,
          id,
          this.photoOfTheWeekModel
        )
      ),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.PhotoOfTheWeek,
          id,
          false,
          this.photoOfTheWeekModel
        )
      ),
      concatMapTo(
        this.entityProvider.findOne$(
          EntityType.PhotoOfTheWeek,
          id,
          this.photoOfTheWeekModel
        )
      ),
      concatMapTo(this.findOne$(id))
    );
  }

  findAll$(): Observable<PhotoOfTheWeek[]> {
    return this.entityProvider
      .findAll$(EntityType.PhotoOfTheWeek, this.photoOfTheWeekModel)
      .pipe(
        map(this.photoOfTheWeekProvider.loadPhotoOfTheWeek),
        toArray<PhotoOfTheWeek>()
      );
  }

  findOne$(id: string): Observable<PhotoOfTheWeek> {
    return this.entityProvider
      .findOne$(EntityType.PhotoOfTheWeek, id, this.photoOfTheWeekModel)
      .pipe(map(this.photoOfTheWeekProvider.loadPhotoOfTheWeek));
  }

  delete$(id: string): Observable<void> {
    return from(this.photoOfTheWeekModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.PhotoOfTheWeek,
          id,
          true,
          this.photoOfTheWeekModel
        )
      ),
      concatMapTo(
        this.entityDeleteProvider.delete$(
          EntityType.PhotoOfTheWeek,
          id,
          this.photoOfTheWeekModel
        )
      )
    );
  }
}
