import { BadRequestException, Injectable } from '@nestjs/common';

import {
  DocumentType,
  Media,
  MediaType,
} from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../functions/image.functions';
import { toImageDimension } from '../functions/image-dimension.functions';
import { toVideo } from '../functions/video.functions';
import { toVideoDimension } from '../functions/video-dimension.functions';
import { DocumentModelProvider } from './document-model.provider';

@Injectable()
export class MediaProvider {
  readonly mediaTypeMap = new Map<MediaType, DocumentType>([
    [MediaType.AppleIcon, DocumentType.MediaAppleIcon],
    [MediaType.AppleResource, DocumentType.MediaAppleResource],
    [MediaType.ImageVideo, DocumentType.MediaImageVideo],
    [MediaType.MobileImage, DocumentType.MediaMobileImage],
    [MediaType.Png, DocumentType.MediaPng],
  ]);

  constructor(private readonly documentModelProvider: DocumentModelProvider) {}

  findDocumentType = (mediaType: MediaType): DocumentType => {
    const documentType = this.mediaTypeMap.get(mediaType);
    if (!documentType)
      throw new BadRequestException(`Unable to find media type ${mediaType}`);
    return documentType;
  };

  newMedia(mediaType: MediaType): Media {
    return {
      type: this.findDocumentType(mediaType),
      slug: mediaType,
      isPublic: false,
      images: [],
      imageDimensions: [],
      videos: [],
      videoDimensions: [],
    } as Media;
  }

  fromDocumentModel = (documentModel: DocumentModel): Media => {
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
    };
  };
}
