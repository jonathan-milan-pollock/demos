import { BadRequestException, Injectable } from '@nestjs/common';

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
import { findPublicContent } from '../functions/public.functions';

@Injectable()
export class BestOfProvider {
  readonly bestOfTypeMap = new Map<BestOfType, DocumentType>([
    [BestOfType.Children, DocumentType.BestOfChildren],
    [BestOfType.Events, DocumentType.BestOfEvents],
    [BestOfType.Landscapes, DocumentType.BestOfLandscapes],
    [BestOfType.Nature, DocumentType.BestOfNature],
    [BestOfType.RealEstate, DocumentType.BestOfRealEstate],
  ]);

  findDocumentType = (bestOfType: BestOfType): DocumentType => {
    const documentType = this.bestOfTypeMap.get(bestOfType);
    if (!documentType)
      throw new BadRequestException(
        `Unable to find best of type ${bestOfType}`
      );
    return documentType;
  };

  newBestOf(bestOfType: BestOfType): BestOf {
    return {
      type: this.findDocumentType(bestOfType),
      slug: bestOfType,
      isPublic: true,
      images: [],
      imageDimensions: [],
      comments: [],
      emotions: [],
    } as BestOf;
  }

  fromDocumentModel = (documentModel: DocumentModel): BestOf => ({
    id: documentModel._id,
    slug: documentModel.slug,
    images: documentModel.images.map((image) => toImage(image)),
    imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
      toImageDimension(imageDimension)
    ),
    comments: documentModel.comments.map((comment) => toComment(comment)),
    emotions: documentModel.emotions.map((emotion) => toEmotion(emotion)),
  });

  fromDocumentModelPublic = (documentModel: DocumentModel): BestOf => {
    const publicContent = findPublicContent(documentModel);
    return {
      id: documentModel._id,
      slug: documentModel.slug,
      images: publicContent.images,
      imageDimensions: publicContent.imageDimensions,
      comments: publicContent.comments,
      emotions: publicContent.emotions,
    };
  };
}
