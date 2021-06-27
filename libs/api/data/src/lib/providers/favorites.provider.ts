import { Injectable } from '@nestjs/common';

import {
  EntityType,
  Favorites,
  FAVORITES_SLUG,
} from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../functions/image.functions';
import { toImageDimension } from '../functions/image-dimension.functions';
import { toVideo } from '../functions/video.functions';
import { toVideoDimension } from '../functions/video-dimension.functions';
import { toComment } from '../functions/comment.functions';
import { toEmotion } from '../functions/emotion.functions';
import { findPublicContent } from '../functions/public.functions';

@Injectable()
export class FavoritesProvider {
  newFavorites(): Favorites {
    return {
      type: EntityType.Favorites,
      slug: FAVORITES_SLUG,
      isPublic: true,
      images: [],
      imageDimensions: [],
      videos: [],
      videoDimensions: [],
      comments: [],
      emotions: [],
    } as Favorites;
  }

  fromDocumentModel = (documentModel: DocumentModel): Favorites => {
    return {
      id: documentModel._id,
      slug: documentModel.slug,
      images: documentModel.images.map((image) => toImage(image)),
      imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
        toImageDimension(imageDimension)
      ),
      videos: documentModel.videos.map((video) => toVideo(video)),
      videoDimensions: documentModel.videoDimensions.map((videoDimension) =>
        toVideoDimension(videoDimension)
      ),
      comments: documentModel.comments.map((comment) => toComment(comment)),
      emotions: documentModel.emotions.map((emotion) => toEmotion(emotion)),
    };
  };

  fromDocumentModelPublic = (documentModel: DocumentModel): Favorites => {
    const publicContent = findPublicContent(documentModel);
    return {
      id: documentModel._id,
      slug: documentModel.slug,
      images: publicContent.images,
      imageDimensions: publicContent.imageDimensions,
      videos: publicContent.videos,
      videoDimensions: publicContent.videoDimensions,
      comments: publicContent.comments,
      emotions: publicContent.emotions,
    };
  };
}
