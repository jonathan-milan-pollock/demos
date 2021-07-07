import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EntityType, ReviewMedia } from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class ReviewMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewMediaModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  findOne$(): Observable<ReviewMedia> {
    return this.entityProvider
      .findAllPublic$(EntityType.ReviewMedia, this.reviewMediaModel)
      .pipe(
        map(this.entityProvider.validateOneEntity)
      ) as Observable<ReviewMedia>;
  }
}
