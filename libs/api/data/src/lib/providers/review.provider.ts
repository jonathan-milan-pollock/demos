import { Injectable } from '@nestjs/common';

import { EntityType, Review } from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../functions/image.functions';
import { toImageDimension } from '../functions/image-dimension.functions';
import { findPublicContent } from '../functions/public.functions';

@Injectable()
export class ReviewProvider {
  newReview(slug: string): Review {
    return {
      type: EntityType.Review,
      slug,
      isPublic: false,
      text: [],
      images: [],
      imageDimensions: [],
    } as Review;
  }

  fromDocumentModel = (documentModel: DocumentModel): Review => ({
    id: documentModel._id,
    slug: documentModel.slug,
    isPublic: documentModel.isPublic,
    title: documentModel.title,
    text: documentModel.text,
    images: documentModel.images.map((image) => toImage(image)),
    imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
      toImageDimension(imageDimension)
    ),
  });

  fromDocumentModelPublic = (documentModel: DocumentModel): Review => {
    const publicContent = findPublicContent(documentModel);
    return {
      id: documentModel._id,
      slug: documentModel.slug,
      isPublic: documentModel.isPublic,
      title: documentModel.title,
      text: documentModel.text,
      images: publicContent.images,
      imageDimensions: publicContent.imageDimensions,
    };
  };
}
