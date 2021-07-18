import { Injectable } from '@nestjs/common';

import {
  ReviewMedia,
  ReviewMediaDto,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadPublicContent } from '../content/public-content.functions';
import {
  loadNewReviewMedia,
  loadReviewMedia,
  loadReviewMediaPublic,
} from '../entities/review-media.functions';

@Injectable()
export class ReviewMediaProvider {
  loadNewReviewMedia(): ReviewMedia {
    return loadNewReviewMedia();
  }

  loadReviewMedia(documentModel: DocumentModel): ReviewMedia {
    return loadReviewMedia(documentModel);
  }

  loadReviewMediaPublic(documentModel: DocumentModel): ReviewMediaDto {
    return loadReviewMediaPublic(loadPublicContent(documentModel));
  }
}
