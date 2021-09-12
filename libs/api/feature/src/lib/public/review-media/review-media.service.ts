import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable, toArray } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityType,
  ReviewMediaDto,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  ReviewMediaProvider,
  validateOneEntity,
} from '@dark-rush-photography/api/data';

@Injectable()
export class ReviewMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewMediaModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly reviewMediaProvider: ReviewMediaProvider
  ) {}

  findOne$(): Observable<ReviewMediaDto> {
    return this.entityProvider
      .findAllPublic$(EntityType.ReviewMedia, this.reviewMediaModel)
      .pipe(
        toArray<DocumentModel>(),
        map(validateOneEntity),
        map(this.reviewMediaProvider.loadReviewMediaPublic)
      );
  }
}
