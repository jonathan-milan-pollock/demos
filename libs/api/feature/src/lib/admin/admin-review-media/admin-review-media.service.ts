import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, iif, Observable, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';

import { DocumentType, ReviewMedia } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  ReviewMediaProvider,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminReviewMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewMediaModel: Model<DocumentModel>,
    private readonly reviewMediaProvider: ReviewMediaProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  create$(): Observable<ReviewMedia> {
    return from(
      this.reviewMediaModel.findOne({ type: DocumentType.ReviewMedia })
    ).pipe(
      switchMap((documentModel) =>
        iif(
          () => documentModel !== null,
          of(documentModel),
          from(
            new this.reviewMediaModel(
              this.reviewMediaProvider.newReviewMedia()
            ).save()
          )
        )
      ),
      map(this.documentModelProvider.validateCreate),
      map(this.reviewMediaProvider.fromDocumentModel)
    );
  }

  findOne$(): Observable<ReviewMedia> {
    return from(
      this.reviewMediaModel.find({ type: DocumentType.ReviewMedia })
    ).pipe(
      map(this.documentModelProvider.validateOne),
      map(this.reviewMediaProvider.fromDocumentModel)
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.reviewMediaModel.findByIdAndDelete(id)).pipe(
      mapTo(undefined)
    );
  }
}
