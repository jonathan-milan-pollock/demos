import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { Review, DocumentType } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  ReviewProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>,
    private readonly reviewProvider: ReviewProvider
  ) {}

  findAll$(): Observable<Review[]> {
    return from(
      this.reviewModel.find({ type: DocumentType.Review }).exec()
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map((documentModel) =>
        this.reviewProvider.fromDocumentModelPublic(documentModel)
      ),
      toArray<Review>()
    );
  }

  findOne$(id: string): Observable<Review> {
    return from(this.reviewModel.findById(id).exec()).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find review media');

        return this.reviewProvider.fromDocumentModelPublic(documentModel);
      })
    );
  }
}
