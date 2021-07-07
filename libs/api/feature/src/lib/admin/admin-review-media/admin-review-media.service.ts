import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EntityType, ReviewMedia } from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/shared-server/types';
import { REVIEW_MEDIA_SLUG } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminReviewMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewMediaModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  create$(): Observable<ReviewMedia> {
    return this.entityProvider.create$(
      EntityType.ReviewMedia,
      DEFAULT_ENTITY_GROUP,
      REVIEW_MEDIA_SLUG,
      this.reviewMediaModel
    ) as Observable<ReviewMedia>;
  }

  findOne$(): Observable<ReviewMedia> {
    return this.entityProvider
      .findAll$(EntityType.ReviewMedia, this.reviewMediaModel)
      .pipe(
        map(this.entityProvider.validateOneEntity)
      ) as Observable<ReviewMedia>;
  }

  delete$(id: string): Observable<void> {
    return this.entityProvider.delete$(
      EntityType.ReviewMedia,
      id,
      this.reviewMediaModel
    );
  }
}
