import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

import {
  PostedState,
  Video,
  VideoDimension,
} from '@dark-rush-photography/shared-types';
import { VideoAddDto, VideoUpdateDto } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toVideo } from '../functions/video.functions';

@Injectable()
export class VideoProvider {
  addVideo = (
    id: string,
    entityId: string,
    video: VideoAddDto,
    videos: Video[]
  ): Partial<DocumentModel> => ({
    videos: [
      ...videos,
      {
        ...video,
        id,
        entityId,
        state: PostedState.New,
        order: 0,
        isStared: false,
        hasTrack: false,
        isFlyOver: false,
      },
    ],
  });

  updateVideo = (
    id: string,
    entityId: string,
    video: VideoUpdateDto,
    videos: Video[]
  ): Partial<DocumentModel> => ({
    videos: [...videos.filter((v) => v.id !== id), { ...video, id, entityId }],
  });

  removeVideo = (
    id: string,
    videos: Video[],
    videoDimensions: VideoDimension[]
  ): Partial<DocumentModel> => ({
    videos: [...videos.filter((v) => v.id !== id)],
    videoDimensions: [...videoDimensions.filter((vd) => vd.videoId !== id)],
  });

  validateAddVideo = (id: string, videos: Video[]): Video => {
    const foundVideo = videos.find((v) => v.id === id);
    if (!foundVideo) throw new NotFoundException('Could not find video to add');

    if (foundVideo.state !== PostedState.New)
      throw new NotFoundException('Only new videos can be added');

    return toVideo(foundVideo);
  };

  validateUpdateVideo = (
    id: string,
    video: VideoUpdateDto,
    videos: Video[]
  ): void => {
    const foundVideo = videos.find((v) => v.id === id);
    if (!foundVideo)
      throw new NotFoundException('Could not find video to update');

    if (
      (foundVideo.state === PostedState.Public ||
        foundVideo.state === PostedState.Archived) &&
      video.state === PostedState.New
    ) {
      throw new NotAcceptableException(
        'Videos that are public or archived cannot be changed to a state of New'
      );
    }
  };

  validateFindVideo(id: string, videos: Video[]): Video {
    const foundVideo = videos.find((v) => v.id === id);
    if (!foundVideo) throw new NotFoundException('Could not find video by id');

    return toVideo(foundVideo);
  }
}
