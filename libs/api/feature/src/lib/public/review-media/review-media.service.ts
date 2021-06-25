import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DocumentType, ReviewMedia } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  ReviewMediaProvider,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class ReviewMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewMediaModel: Model<DocumentModel>,
    private readonly reviewMediaProvider: ReviewMediaProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  findOne$(): Observable<ReviewMedia> {
    return from(
      this.reviewMediaModel.find({ type: DocumentType.ReviewMedia })
    ).pipe(
      map(this.documentModelProvider.validateOne),
      map(this.reviewMediaProvider.fromDocumentModelPublic)
    );
  }
}
