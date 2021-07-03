import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import {
  Review,
  EntityType,
  ReviewUpdate,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_GROUP } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly serverlessEntityProvider: ServerlessEntityProvider
  ) {}

  create$(slug: string): Observable<Review> {
    return this.entityProvider.create$(
      EntityType.Review,
      slug,
      this.reviewModel
    ) as Observable<Review>;
  }

  updateProcess$(id: string, reviewUpdate: ReviewUpdate): Observable<void> {
    return this.serverlessEntityProvider.updateProcess$(
      EntityType.Review,
      id,
      this.reviewModel,
      {
        ...reviewUpdate,
        group: DEFAULT_GROUP,
        keywords: [],
        useTileImage: false,
        hasExtendedReality: false,
        socialMediaUrls: [],
      }
    );
  }

  postProcess$(id: string): Observable<void> {
    return this.serverlessEntityProvider.postProcess$(
      EntityType.Review,
      id,
      this.reviewModel
    );
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

  deleteProcess$(id: string): Observable<void> {
    return this.serverlessEntityProvider.deleteProcess$(
      EntityType.Review,
      id,
      this.reviewModel
    );
  }
}
