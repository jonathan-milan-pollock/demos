import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import { Review, EntityType } from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  findAll$(): Observable<Review[]> {
    return this.entityProvider.findAllPublic$(
      EntityType.Review,
      this.reviewModel
    ) as Observable<Review[]>;
  }

  findOne$(id: string): Observable<Review> {
    return this.entityProvider.findOnePublic$(
      EntityType.Review,
      id,
      this.reviewModel
    ) as Observable<Review>;
  }
}
