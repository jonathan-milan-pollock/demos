import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { DocumentType, ReviewMedia } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  ReviewMediaProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminReviewMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewMediaModel: Model<DocumentModel>,
    private readonly reviewMediaProvider: ReviewMediaProvider
  ) {}

  create$(): Observable<ReviewMedia> {
    return from(
      this.reviewMediaModel.findOne({ type: DocumentType.ReviewMedia })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel)
          throw new ConflictException(
            `Review media has already been created`,
            HttpStatus.FOUND
          );

        return from(
          new this.reviewMediaModel({
            type: DocumentType.ReviewMedia,
            slug: 'media',
            isPublic: true,
            text: [],
            images: [],
            imageDimensions: [],
            videos: [],
            videoDimensions: [],
          } as ReviewMedia).save()
        );
      }),
      map((documentModel: DocumentModel) => {
        if (!documentModel) {
          throw new BadRequestException('Unable to create review media');
        }
        return this.reviewMediaProvider.fromDocumentModel(documentModel);
      })
    );
  }

  delete$(id: string): Observable<void> {
    return of(this.reviewMediaModel.findByIdAndDelete(id)).pipe(
      mapTo(undefined)
    );
  }
}
