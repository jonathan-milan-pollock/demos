import { Injectable } from '@nestjs/common';

import { Event, EntityType } from '@dark-rush-photography/shared-types';
import { EventCreateDto } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../functions/image.functions';
import { toImageDimension } from '../functions/image-dimension.functions';
import { toVideo } from '../functions/video.functions';
import { toVideoDimension } from '../functions/video-dimension.functions';
import { toComment } from '../functions/comment.functions';
import { toEmotion } from '../functions/emotion.functions';
import { findPublicContent } from '../functions/public.functions';

@Injectable()
export class EventProvider {
  newEvent(event: EventCreateDto): Event {
    return {
      type: EntityType.Event,
      group: event.group,
      slug: event.slug,
      isPublic: false,
      keywords: [],
      useTileImage: false,
      text: [],
      images: [],
      imageDimensions: [],
      videos: [],
      videoDimensions: [],
      comments: [],
      emotions: [],
    } as Event;
  }

  fromDocumentModel = (documentModel: DocumentModel): Event => {
    return {
      id: documentModel._id,
      group: documentModel.group,
      slug: documentModel.slug,
      isPublic: documentModel.isPublic,
      title: documentModel.title,
      description: documentModel.description,
      keywords: documentModel.keywords,
      dateCreated: documentModel.dateCreated,
      datePublished: documentModel.datePublished,
      location: documentModel.location,
      useTileImage: documentModel.useTileImage,
      text: documentModel.text,
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

  fromDocumentModelPublic = (documentModel: DocumentModel): Event => {
    const publicContent = findPublicContent(documentModel);
    return {
      id: documentModel._id,
      group: documentModel.group,
      slug: documentModel.slug,
      isPublic: documentModel.isPublic,
      title: documentModel.title,
      description: documentModel.description,
      keywords: documentModel.keywords,
      dateCreated: documentModel.dateCreated,
      datePublished: documentModel.datePublished,
      location: documentModel.location,
      useTileImage: documentModel.useTileImage,
      text: documentModel.text,
      images: publicContent.images,
      imageDimensions: publicContent.imageDimensions,
      videos: publicContent.videos,
      videoDimensions: publicContent.videoDimensions,
      comments: publicContent.comments,
      emotions: publicContent.emotions,
    };
  };
}
