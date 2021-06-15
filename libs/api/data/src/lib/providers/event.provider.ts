import { Injectable } from '@nestjs/common';

import { Event } from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { ImageProvider } from './image.provider';
import { ImageDimensionProvider } from './image-dimension.provider';
import { VideoProvider } from './video.provider';
import { VideoDimensionProvider } from './video-dimension.provider';
import { CommentProvider } from './comment.provider';
import { EmotionProvider } from './emotion.provider';

@Injectable()
export class EventProvider {
  constructor(
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider,
    private readonly videoProvider: VideoProvider,
    private readonly videoDimensionProvider: VideoDimensionProvider,
    private readonly commentProvider: CommentProvider,
    private readonly emotionProvider: EmotionProvider
  ) {}

  fromDocumentModel(documentModel: DocumentModel): Event {
    return {
      id: documentModel._id,
      slug: documentModel.slug,
      group: documentModel.group,
      isPublic: documentModel.isPublic,
      title: documentModel.title,
      description: documentModel.description,
      keywords: documentModel.keywords,
      dateCreated: documentModel.dateCreated,
      datePublished: documentModel.datePublished,
      location: documentModel.location,
      useTileImage: documentModel.useTileImage,
      text: documentModel.text,
      images: documentModel.images.map((image) =>
        this.imageProvider.toImage(image)
      ),
      imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
        this.imageDimensionProvider.toImageDimension(imageDimension)
      ),
      videos: documentModel.videos.map((video) =>
        this.videoProvider.toVideo(video)
      ),
      videoDimensions: documentModel.videoDimensions.map((videoDimension) =>
        this.videoDimensionProvider.toVideoDimension(videoDimension)
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
