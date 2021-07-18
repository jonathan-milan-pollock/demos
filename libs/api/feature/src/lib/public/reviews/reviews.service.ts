import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { map, Observable, toArray } from 'rxjs';

import { EntityType, ReviewDto } from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  ReviewProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>,
    private readonly reviewProvider: ReviewProvider,
    private readonly entityProvider: EntityProvider
  ) {}

  findAll$(): Observable<ReviewDto[]> {
    return this.entityProvider
      .findAllPublic$(EntityType.Review, this.reviewModel)
      .pipe(map(this.reviewProvider.loadReviewPublic), toArray<ReviewDto>());
  }
}
