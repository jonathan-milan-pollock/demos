import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

import {
  PostState,
  Video,
  VideoDimension,
} from '@dark-rush-photography/shared-types';
import { VideoAddDto, VideoUpdateDto } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toVideo } from '../functions/video.functions';

@Injectable()
export class VideoProvider {
  toVideo = (video: Video): Video => toVideo(video);

  addVideo = (
    id: string,
    entityId: string,
    videoAdd: VideoAddDto,
    videos: Video[]
  ): Partial<DocumentModel> => ({
    videos: [
      ...videos,
      {
        ...videoAdd,
        id,
        entityId,
        postState: PostState.New,
        order: 0,
        isStared: false,
        hasTrack: false,
        isFlyOver: false,
      },
    ],
  });

  updateVideo = (
    id: string,
    foundVideo: Video,
    videoUpdate: VideoUpdateDto,
    videos: Video[]
  ): Partial<DocumentModel> => ({
    videos: [
      ...videos.filter((v) => v.id !== id),
      { ...foundVideo, ...videoUpdate },
    ],
  });

  removeVideo = (
    id: string,
    videos: Video[],
    videoDimensions: VideoDimension[]
  ): Partial<DocumentModel> => ({
    videos: [...videos.filter((v) => v.id !== id)],
    videoDimensions: [...videoDimensions.filter((vd) => vd.videoId !== id)],
  });

  validateUpdateVideo = (
    id: string,
    videoPostState: PostState,
    videos: Video[]
  ): Video => {
    const foundVideo = videos.find((v) => v.id === id);
    if (!foundVideo)
      throw new NotFoundException('Could not find video to update');

    if (
      (foundVideo.postState === PostState.Public ||
        foundVideo.postState === PostState.Archived) &&
      videoPostState === PostState.New
    ) {
      throw new NotAcceptableException(
        'Videos that are public or archived cannot be changed to a state of New'
      );
    }
    return foundVideo;
  };

  findVideoBySlug = (slug: string, videos: Video[]): Video | undefined => {
    return videos.find((v) => v.fileName === slug);
  };

  validateFindVideo(id: string, videos: Video[]): Video {
    const foundVideo = videos.find((v) => v.id === id);
    if (!foundVideo) throw new NotFoundException('Could not find video by id');

    return toVideo(foundVideo);
  }
}
