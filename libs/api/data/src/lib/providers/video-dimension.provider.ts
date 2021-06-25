import { Injectable, NotFoundException } from '@nestjs/common';

import {
  VideoDimension,
  VideoDimensionType,
} from '@dark-rush-photography/shared-types';
import {
  VideoDimensionAddDto,
  VideoDimensionUpdateDto,
} from '@dark-rush-photography/api/types';
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
    videoDimension: VideoDimensionAddDto,
    videoDimensions: VideoDimension[]
  ): Partial<DocumentModel> => ({
    videoDimensions: [
      ...videoDimensions,
      { ...videoDimension, id, entityId, videoId },
    ],
  });

  updateVideoDimension = (
    id: string,
    foundVideoDimension: VideoDimension,
    videoDimensionUpdate: VideoDimensionUpdateDto,
    videoDimensions: VideoDimension[]
  ): Partial<DocumentModel> => ({
    videoDimensions: [
      ...videoDimensions.filter((videoDimension) => videoDimension.id !== id),
      {
        ...foundVideoDimension,
        ...videoDimensionUpdate,
      },
    ],
  });

  removeVideoDimension = (
    id: string,
    videoDimensions: VideoDimension[]
  ): Partial<DocumentModel> => ({
    videoDimensions: [
      ...videoDimensions.filter((videoDimension) => videoDimension.id !== id),
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
