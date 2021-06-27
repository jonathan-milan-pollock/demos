import { Injectable, NotFoundException } from '@nestjs/common';

import {
  VideoDimension,
  VideoDimensionType,
} from '@dark-rush-photography/shared-types';
import { VideoDimensionAddDto } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toVideoDimension } from '../functions/video-dimension.functions';

@Injectable()
export class VideoDimensionProvider {
  toVideoDimension(imageDimension: VideoDimension): VideoDimension {
    return toVideoDimension(imageDimension);
  }

  addVideoDimension = (
    id: string,
    entityId: string,
    videoId: string,
    videoDimensionAdd: VideoDimensionAddDto,
    videoDimensions: VideoDimension[]
  ): Partial<DocumentModel> => ({
    videoDimensions: [
      ...videoDimensions,
      { ...videoDimensionAdd, id, entityId, videoId },
    ],
  });

  findVideoDimension = (
    videoId: string,
    videoDimensionType: VideoDimensionType,
    videoDimensions: VideoDimension[]
  ): VideoDimension | undefined => {
    return videoDimensions.find(
      (vd) => vd.videoId === videoId && vd.type === videoDimensionType
    );
  };

  validateFindVideoDimension = (
    id: string,
    videoDimensions: VideoDimension[]
  ): VideoDimension => {
    const foundVideoDimension = videoDimensions.find(
      (videoDimension) => videoDimension.id === id
    );
    if (!foundVideoDimension)
      throw new NotFoundException('Could not find video dimension to update');
    return foundVideoDimension;
  };
}
