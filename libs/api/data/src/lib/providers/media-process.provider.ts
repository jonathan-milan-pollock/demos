import { BadRequestException, Injectable } from '@nestjs/common';

import {
  EntityType,
  MediaProcess,
  MediaProcessType,
} from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../functions/image.functions';
import { toImageDimension } from '../functions/image-dimension.functions';
import { toVideo } from '../functions/video.functions';
import { toVideoDimension } from '../functions/video-dimension.functions';

@Injectable()
export class MediaProcessProvider {
  readonly mediaProcessTypeMap = new Map<MediaProcessType, EntityType>([
    [MediaProcessType.AppleResource, EntityType.MediaProcessAppleResource],
    [MediaProcessType.Icon, EntityType.MediaProcessIcon],
    [MediaProcessType.ImageVideo, EntityType.MediaProcessImageVideo],
    [MediaProcessType.MobileImage, EntityType.MediaProcessMobileImage],
    [MediaProcessType.Png, EntityType.MediaProcessPng],
  ]);

  findEntityType = (mediaProcessType: MediaProcessType): EntityType => {
    const entityType = this.mediaProcessTypeMap.get(mediaProcessType);
    if (!entityType)
      throw new BadRequestException(
        `Unable to find media process type ${mediaProcessType}`
      );
    return entityType;
  };

  newMediaProcess(
    mediaProcessType: MediaProcessType,
    slug: string
  ): MediaProcess {
    return {
      type: this.findEntityType(mediaProcessType),
      slug,
      isPublic: false,
      images: [],
      imageDimensions: [],
      videos: [],
      videoDimensions: [],
    } as MediaProcess;
  }

  fromDocumentModel = (documentModel: DocumentModel): MediaProcess => {
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
