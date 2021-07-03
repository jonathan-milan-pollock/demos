import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EntityType, ReviewMedia } from '@dark-rush-photography/shared/types';
import { REVIEW_MEDIA_SLUG } from '@dark-rush-photography/shared-server/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminReviewMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewMediaModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly serverlessEntityProvider: ServerlessEntityProvider
  ) {}

  create$(): Observable<ReviewMedia> {
    return this.entityProvider.create$(
      EntityType.ReviewMedia,
      REVIEW_MEDIA_SLUG,
      this.reviewMediaModel
    ) as Observable<ReviewMedia>;
  }

  findOne$(): Observable<ReviewMedia> {
    return this.entityProvider
      .findAll$(EntityType.ReviewMedia, this.reviewMediaModel)
      .pipe(map(this.entityProvider.validateOne)) as Observable<ReviewMedia>;
  }

  deleteProcess$(id: string): Observable<void> {
    return this.serverlessEntityProvider.deleteProcess$(
      EntityType.ReviewMedia,
      id,
      this.reviewMediaModel
    );
  }
}
