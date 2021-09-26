import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Observable, toArray } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import { ReviewDto } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityFindAllPublicProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>,
    private readonly entityPublicProvider: EntityFindAllPublicProvider
  ) {}

  findAll$(): Observable<ReviewDto[]> {
    return this.entityPublicProvider
      .findAllPublic$(EntityType.Review, this.reviewModel)
      .pipe(toArray<ReviewDto>());
  }
}
