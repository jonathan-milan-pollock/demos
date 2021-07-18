import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { concatMapTo, from, map, Observable, toArray } from 'rxjs';

import { EntityType, ReviewMedia } from '@dark-rush-photography/shared/types';
import {
  DEFAULT_ENTITY_GROUP,
  REVIEW_MEDIA_SLUG,
} from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityDeleteProvider,
  ReviewMediaProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminReviewMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewMediaModel: Model<DocumentModel>,
    private readonly reviewMediaProvider: ReviewMediaProvider,
    private readonly entityProvider: EntityProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider
  ) {}

  create$(): Observable<ReviewMedia> {
    return this.entityProvider
      .create$(
        EntityType.ReviewMedia,
        DEFAULT_ENTITY_GROUP,
        REVIEW_MEDIA_SLUG,
        this.reviewMediaModel
      )
      .pipe(
        concatMapTo(
          from(
            new this.reviewMediaModel({
              ...this.reviewMediaProvider.loadNewReviewMedia(),
              type: EntityType.ReviewMedia,
              isPublic: true,
            }).save()
          )
        ),
        map(this.entityProvider.validateEntityCreate),
        map(this.reviewMediaProvider.loadReviewMedia)
      );
  }

  findOne$(): Observable<ReviewMedia> {
    return this.entityProvider
      .findAll$(EntityType.ReviewMedia, this.reviewMediaModel)
      .pipe(
        toArray<DocumentModel>(),
        map(this.entityProvider.validateOneEntity),
        map(this.reviewMediaProvider.loadReviewMedia)
      );
  }

  delete$(id: string): Observable<void> {
    return from(this.reviewMediaModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.ReviewMedia,
          id,
          true,
          this.reviewMediaModel
        )
      ),
      concatMapTo(
        this.entityDeleteProvider.delete$(
          EntityType.ReviewMedia,
          id,
          this.reviewMediaModel
        )
      )
    );
  }
}
