import { Injectable } from '@nestjs/common';

import {
  BestOf,
  BestOfType,
  DocumentType,
} from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../functions/image.functions';
import { toImageDimension } from '../functions/image-dimension.functions';
import { toComment } from '../functions/comment.functions';
import { toEmotion } from '../functions/emotion.functions';
import { findDocumentTypeFromBestOfType } from '../functions/best-of-type.functions';
import { findPublicContent } from '../functions/public.functions';

@Injectable()
export class BestOfProvider {
  findDocumentType(bestOfType: BestOfType): DocumentType {
    return findDocumentTypeFromBestOfType(bestOfType);
  }

  fromDocumentModel(documentModel: DocumentModel): BestOf {
    return {
      id: documentModel._id,
      slug: documentModel.slug,
      images: documentModel.images.map((image) => toImage(image)),
      imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
        toImageDimension(imageDimension)
      ),
      comments: documentModel.comments.map((comment) => toComment(comment)),
      emotions: documentModel.emotions.map((emotion) => toEmotion(emotion)),
    };
  }

  fromDocumentModelPublic(documentModel: DocumentModel): BestOf {
    const publicContent = findPublicContent(documentModel);
    return {
      id: documentModel._id,
      slug: documentModel.slug,
      images: publicContent.images,
      imageDimensions: publicContent.imageDimensions,
      comments: publicContent.comments,
      emotions: publicContent.emotions,
    };
  }
}
