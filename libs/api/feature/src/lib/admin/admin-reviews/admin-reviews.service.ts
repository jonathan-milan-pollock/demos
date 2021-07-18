import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { concatMapTo, from, map, Observable, toArray } from 'rxjs';

import {
  Review,
  EntityType,
  ReviewCreateDto,
  ReviewUpdateDto,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityUpdateProvider,
  EntityPostProvider,
  EntityDeleteProvider,
  ReviewProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>,
    private readonly reviewProvider: ReviewProvider,
    private readonly entityProvider: EntityProvider,
    private readonly entityUpdateProvider: EntityUpdateProvider,
    private readonly entityPostProvider: EntityPostProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider
  ) {}

  create$(reviewCreate: ReviewCreateDto): Observable<Review> {
    return this.entityProvider
      .create$(
        EntityType.Review,
        DEFAULT_ENTITY_GROUP,
        reviewCreate.slug,
        this.reviewModel
      )
      .pipe(
        concatMapTo(
          from(
            new this.reviewModel({
              ...this.reviewProvider.loadNewReview(reviewCreate.slug),
              type: EntityType.Review,
            }).save()
          )
        ),
        map(this.entityProvider.validateEntityCreate),
        map(this.reviewProvider.loadReview)
      );
  }

  update$(id: string, reviewUpdate: ReviewUpdateDto): Observable<Review> {
    return from(this.reviewModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Review,
          id,
          true,
          this.reviewModel
        )
      ),
      concatMapTo(
        this.entityUpdateProvider.update$(
          EntityType.Review,
          id,
          this.reviewModel
        )
      ),
      concatMapTo(
        this.reviewModel.findByIdAndUpdate(id, {
          ...reviewUpdate,
        })
      ),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Review,
          id,
          false,
          this.reviewModel
        )
      ),
      concatMapTo(this.findOne$(id))
    );
  }

  post$(id: string): Observable<Review> {
    return from(this.reviewModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Review,
          id,
          true,
          this.reviewModel
        )
      ),
      concatMapTo(
        this.entityPostProvider.post$(EntityType.Review, id, this.reviewModel)
      ),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Review,
          id,
          false,
          this.reviewModel
        )
      ),
      concatMapTo(this.findOne$(id))
    );
  }

  findAll$(): Observable<Review[]> {
    return this.entityProvider
      .findAll$(EntityType.Review, this.reviewModel)
      .pipe(map(this.reviewProvider.loadReview), toArray<Review>());
  }

  findOne$(id: string): Observable<Review> {
    return this.entityProvider
      .findOne$(EntityType.Review, id, this.reviewModel)
      .pipe(map(this.reviewProvider.loadReview));
  }

  delete$(id: string): Observable<void> {
    return from(this.reviewModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Review,
          id,
          true,
          this.reviewModel
        )
      ),
      concatMapTo(
        this.entityDeleteProvider.delete$(
          EntityType.Review,
          id,
          this.reviewModel
        )
      )
    );
  }
}
