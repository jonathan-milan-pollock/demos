import { BadRequestException, Injectable } from '@nestjs/common';

import {
  BestOf,
  BestOfType,
  EntityType,
} from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../functions/image.functions';
import { toImageDimension } from '../functions/image-dimension.functions';
import { toComment } from '../functions/comment.functions';
import { toEmotion } from '../functions/emotion.functions';
import { findPublicContent } from '../functions/public.functions';

@Injectable()
export class BestOfProvider {
  readonly bestOfTypeMap = new Map<BestOfType, EntityType>([
    [BestOfType.Children, EntityType.BestOfChildren],
    [BestOfType.Events, EntityType.BestOfEvents],
    [BestOfType.Landscapes, EntityType.BestOfLandscapes],
    [BestOfType.Nature, EntityType.BestOfNature],
    [BestOfType.RealEstate, EntityType.BestOfRealEstate],
  ]);

  findEntityType = (bestOfType: BestOfType): EntityType => {
    const entityType = this.bestOfTypeMap.get(bestOfType);
    if (!entityType)
      throw new BadRequestException(
        `Unable to find best of type ${bestOfType}`
      );
    return entityType;
  };

  newBestOf(bestOfType: BestOfType): BestOf {
    return {
      type: this.findEntityType(bestOfType),
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
