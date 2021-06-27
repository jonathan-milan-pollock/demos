import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { Review, EntityType } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  ReviewProvider,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>,
    private readonly reviewProvider: ReviewProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  findAll$(): Observable<Review[]> {
    return from(this.reviewModel.find({ type: EntityType.Review })).pipe(
      switchMap((documentModels) => from(documentModels)),
      map(this.reviewProvider.fromDocumentModelPublic),
      toArray<Review>()
    );
  }

  findOne$(id: string): Observable<Review> {
    return from(this.reviewModel.findById(id)).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.reviewProvider.fromDocumentModelPublic)
    );
  }
}
