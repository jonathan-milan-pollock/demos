import { Injectable } from '@nestjs/common';

import { Destination } from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { ImageProvider } from './image.provider';
import { ImageDimensionProvider } from './image-dimension.provider';
import { VideoProvider } from './video.provider';
import { VideoDimensionProvider } from './video-dimension.provider';
import { CommentProvider } from './comment.provider';
import { EmotionProvider } from './emotion.provider';

@Injectable()
export class DestinationProvider {
  constructor(
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider,
    private readonly videoProvider: VideoProvider,
    private readonly videoDimensionProvider: VideoDimensionProvider,
    private readonly commentProvider: CommentProvider,
    private readonly emotionProvider: EmotionProvider
  ) {}

  fromDocumentModel(documentModel: DocumentModel): Destination {
    return {
      id: documentModel._id,
      slug: documentModel.slug,
      isPublic: documentModel.isPublic,
      title: documentModel.title,
      description: documentModel.description,
      keywords: documentModel.keywords,
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
      hasExtendedReality: documentModel.hasExtendedReality,
      websiteUrl: documentModel.websiteUrl,
      socialMediaUrls: documentModel.socialMediaUrls,
      comments: documentModel.comments.map((comment) =>
        this.commentProvider.toComment(comment)
      ),
      emotions: documentModel.emotions.map((emotion) =>
        this.emotionProvider.toEmotion(emotion)
      ),
    };
  }
}
