import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Observable } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import { ReviewMediaDto } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityFindAllPublicProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class ReviewMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewMediaModel: Model<DocumentModel>,
    private readonly entityProvider: EntityFindAllPublicProvider
  ) {}

  findOne$(): Observable<ReviewMediaDto> {
    return this.entityProvider.findAllPublic$(
      EntityType.ReviewMedia,
      this.reviewMediaModel
    );
  }
}
