import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable, toArray } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import { ReviewDto } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityPublicProvider,
  ReviewProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>,
    private readonly entityProvider: EntityPublicProvider,
    private readonly reviewProvider: ReviewProvider
  ) {}

  findAll$(): Observable<ReviewDto[]> {
    return this.entityProvider
      .findAllPublic$(EntityType.Review, this.reviewModel)
      .pipe(map(this.reviewProvider.loadReviewPublic), toArray<ReviewDto>());
  }
}
