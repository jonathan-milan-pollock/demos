import { Injectable } from '@nestjs/common';

import { BestOf } from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { ImageProvider } from './image.provider';
import { ImageDimensionProvider } from './image-dimension.provider';
import { CommentProvider } from './comment.provider';
import { EmotionProvider } from './emotion.provider';

@Injectable()
export class BestOfProvider {
  constructor(
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider,
    private readonly commentProvider: CommentProvider,
    private readonly emotionProvider: EmotionProvider
  ) {}

  fromDocumentModel(documentModel: DocumentModel): BestOf {
    return {
      id: documentModel._id,
      slug: documentModel.slug,
      images: documentModel.images.map((image) =>
        this.imageProvider.toImage(image)
      ),
      imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
        this.imageDimensionProvider.toImageDimension(imageDimension)
      ),
      comments: documentModel.comments.map((comment) =>
        this.commentProvider.toComment(comment)
      ),
      emotions: documentModel.emotions.map((emotion) =>
        this.emotionProvider.toEmotion(emotion)
      ),
    };
  }
}
