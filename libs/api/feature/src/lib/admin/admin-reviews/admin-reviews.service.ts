import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { Review, DocumentType } from '@dark-rush-photography/shared-types';
import { ReviewUpdateDto } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  ReviewProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>,
    private readonly reviewProvider: ReviewProvider
  ) {}

  create$(slug: string): Observable<Review> {
    return from(
      this.reviewModel.findOne({ type: DocumentType.Review, slug })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel)
          throw new ConflictException(
            `Reviews has already been created`,
            HttpStatus.FOUND
          );

        return from(
          new this.reviewModel({
            type: DocumentType.Review,
            slug,
            isPublic: false,
            text: [],
            images: [],
            imageDimensions: [],
          } as Review).save()
        );
      }),
      map((documentModel: DocumentModel) => {
        if (!documentModel) {
          throw new BadRequestException(`Unable to create reviews`);
        }
        return this.reviewProvider.fromDocumentModel(documentModel);
      })
    );
  }

  update$(id: string, review: ReviewUpdateDto): Observable<Review> {
    return from(
      this.reviewModel.findByIdAndUpdate(id, {
        slug: review.slug,
        isPublic: review.isPublic,
        title: review.title,
        text: review.text,
      })
    ).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException(`Unable to update review ${review.slug}`);

        return this.reviewProvider.fromDocumentModel(documentModel);
      })
    );
  }

  delete$(id: string): Observable<void> {
    return of(this.reviewModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
