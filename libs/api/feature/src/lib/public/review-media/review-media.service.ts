import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { map, Observable, toArray } from 'rxjs';

import {
  EntityType,
  ReviewMediaDto,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityLoadProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class ReviewMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewMediaModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly entityLoadProvider: EntityLoadProvider
  ) {}

  findOne$(): Observable<ReviewMediaDto> {
    return this.entityProvider
      .findAllPublic$(EntityType.ReviewMedia, this.reviewMediaModel)
      .pipe(
        toArray<DocumentModel>(),
        map(this.entityProvider.validateOneEntity),
        map(this.entityLoadProvider.loadReviewMediaPublic)
      );
  }
}
