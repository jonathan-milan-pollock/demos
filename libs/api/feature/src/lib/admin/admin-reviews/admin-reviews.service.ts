import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, concatMapTo } from 'rxjs/operators';

import {
  Review,
  EntityType,
  ReviewUpdate,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/shared-server/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  create$(slug: string): Observable<Review> {
    return this.entityProvider.create$(
      EntityType.Review,
      DEFAULT_ENTITY_GROUP,
      slug,
      this.reviewModel
    ) as Observable<Review>;
  }

  update$(id: string, reviewUpdate: ReviewUpdate): Observable<Review> {
    return from(this.reviewModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      concatMapTo(this.reviewModel.findByIdAndUpdate(id, { ...reviewUpdate })),
      concatMapTo(
        this.entityProvider.findOne$(
          EntityType.Review,
          id,
          this.reviewModel
        ) as Observable<Review>
      )
    );
  }

  post$(id: string): Observable<void> {
    throw new NotImplementedException();
  }

  findAll$(): Observable<Review[]> {
    return this.entityProvider.findAll$(
      EntityType.Review,
      this.reviewModel
    ) as Observable<Review[]>;
  }

  findOne$(id: string): Observable<Review> {
    return this.entityProvider.findOne$(
      EntityType.Review,
      id,
      this.reviewModel
    ) as Observable<Review>;
  }

  delete$(id: string): Observable<void> {
    return this.entityProvider.delete$(EntityType.Review, id, this.reviewModel);
  }
}
