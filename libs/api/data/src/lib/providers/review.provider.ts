import { Injectable } from '@nestjs/common';

import { Review, ReviewDto } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadPublicContent } from '../content/public-content.functions';
import {
  loadNewReview,
  loadReview,
  loadReviewPublic,
} from '../entities/review.functions';

@Injectable()
export class ReviewProvider {
  loadNewReview(slug: string): Review {
    return loadNewReview(slug);
  }

  loadReview(documentModel: DocumentModel): Review {
    return loadReview(documentModel);
  }

  loadReviewPublic(documentModel: DocumentModel): ReviewDto {
    return loadReviewPublic(documentModel, loadPublicContent(documentModel));
  }
}
