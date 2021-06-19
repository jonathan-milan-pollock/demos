import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { DocumentType, ReviewMedia } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  ReviewMediaProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class ReviewMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewMediaModel: Model<DocumentModel>,
    private readonly reviewMediaProvider: ReviewMediaProvider
  ) {}

  findAll$(): Observable<ReviewMedia[]> {
    return from(
      this.reviewMediaModel.find({ type: DocumentType.ReviewMedia }).exec()
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map((documentModel) =>
        this.reviewMediaProvider.fromDocumentModelPublic(documentModel)
      ),
      toArray<ReviewMedia>()
    );
  }

  findOne$(id: string): Observable<ReviewMedia> {
    return from(this.reviewMediaModel.findById(id).exec()).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find review media');

        return this.reviewMediaProvider.fromDocumentModelPublic(documentModel);
      })
    );
  }
}
