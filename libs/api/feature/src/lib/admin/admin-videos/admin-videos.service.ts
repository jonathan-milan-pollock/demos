import {
  BadRequestException,
  HttpService,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';

import { ENV, Video } from '@dark-rush-photography/shared-types';
import {
  Env,
  VideoAddDto,
  VideoUpdateDto,
} from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  VideoProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminVideosService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly videoProvider: VideoProvider
  ) {}

  add$(entityId: string, video: VideoAddDto): Observable<Video> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId).exec()).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException('Could not find entity to add video');

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...response.videos.filter((i) => i.slug !== video.slug),
              { ...video, id, entityId, order: 0, isStared: false },
            ],
          })
        );
      }),
      switchMapTo(this.videoProvider.findById$(this.entityModel, entityId, id))
    );
  }

  update$(
    entityId: string,
    videoId: string,
    video: VideoUpdateDto
  ): Observable<Video> {
    return from(this.entityModel.findById(entityId).exec()).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException('Could not find entity to add video');

        const foundVideo = response.images.find((v) => v.id === videoId);
        if (!foundVideo)
          throw new NotFoundException('Could not find video to update');

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            videos: [
              ...response.videos.filter((v) => v.id !== videoId),
              { ...video, id: videoId, entityId },
            ],
          })
        );
      }),
      switchMapTo(
        this.videoProvider.findById$(this.entityModel, entityId, videoId)
      )
    );
  }

  upload$(entityId: string, file: Express.Multer.File): Observable<Video> {
    return this.videoProvider.upload$(
      this.env.serverless,
      this.httpService,
      entityId,
      file
    );
  }

  remove$(entityId: string, videoId: string): Observable<void> {
    return from(this.entityModel.findById(entityId).exec()).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException('Could not find entity to remove video');

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            videos: [...response.videos.filter((v) => v.id !== videoId)],
            videoDimensions: [
              ...response.videoDimensions.filter(
                (vd) => vd.videoId !== videoId
              ),
            ],
          })
        );
      }),
      map((response) => {
        if (!response) {
          throw new BadRequestException('Unable to remove video');
        }
      })
    );
  }
}
