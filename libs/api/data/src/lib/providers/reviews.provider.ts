import { Injectable } from '@nestjs/common';

import { Reviews } from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { ImageProvider } from './image.provider';
import { ImageDimensionProvider } from './image-dimension.provider';
import { VideoProvider } from './video.provider';
import { VideoDimensionProvider } from './video-dimension.provider';

@Injectable()
export class ReviewsProvider {
  constructor(
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider,
    private readonly videoProvider: VideoProvider,
    private readonly videoDimensionProvider: VideoDimensionProvider
  ) {}

  fromDocumentModel(documentModel: DocumentModel): Reviews {
    return {
      id: documentModel._id,
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
    };
  }
}
