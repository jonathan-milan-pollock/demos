import {
  BadRequestException,
  HttpService,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { from, Observable } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';
import { Model } from 'mongoose';

import {
  ENV,
  VideoDimension,
  VideoDimensionData,
} from '@dark-rush-photography/shared-types';
import {
  Env,
  VideoDimensionAddDto,
  VideoDimensionUpdateDto,
} from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  VideoDimensionProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminVideoDimensionsService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly videoDimensionProvider: VideoDimensionProvider
  ) {}

  add$ = (
    entityId: string,
    videoId: string,
    videoDimension: VideoDimensionAddDto
  ): Observable<VideoDimension> => {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId).exec()).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException(
            'Could not find entity to add video dimension'
          );

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            videoDimensions: [
              ...response.videoDimensions.filter(
                (vd) => vd.videoId !== videoId
              ),
              { ...videoDimension, id, entityId, videoId },
            ],
          })
        );
      }),
      switchMapTo(
        this.videoDimensionProvider.findById$(this.entityModel, entityId, id)
      )
    );
  };

  update$ = (
    entityId: string,
    videoId: string,
    videoDimensionId: string,
    videoDimension: VideoDimensionUpdateDto
  ): Observable<VideoDimension> => {
    return from(this.entityModel.findById(entityId).exec()).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException(
            'Could not find entity to add video dimension'
          );

        const foundVideoDimension = response.videoDimensions.find(
          (id) => id.id === videoDimensionId
        );
        if (!foundVideoDimension)
          throw new NotFoundException(
            'Could not find video dimension to update'
          );

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            videoDimensions: [
              ...response.videoDimensions.filter(
                (vd) => vd.videoId !== videoId
              ),
              {
                ...videoDimension,
                id: videoDimensionId,
                entityId,
                videoId,
                type: foundVideoDimension.type,
                pixels: foundVideoDimension.pixels,
              },
            ],
          })
        );
      }),
      switchMapTo(
        this.videoDimensionProvider.findById$(
          this.entityModel,
          entityId,
          videoDimensionId
        )
      )
    );
  };

  getData$ = (
    entityId: string,
    videoId: string,
    videoDimensionId: string
  ): Observable<VideoDimensionData> => {
    return from(
      this.httpService.post(
        `${this.env.serverless.drpServerlessUrl}/video-dimension-data`,
        {
          headers: {
            'x-functions-key': this.env.serverless.drpServerlessFunctionsKey,
          },
        }
      )
    ).pipe(map((axiosResponse) => axiosResponse.data));
  };

  remove$ = (id: string, videoDimensionId: string): Observable<void> => {
    return from(this.entityModel.findById(id).exec()).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException(
            'Could not find entity to remove video dimension'
          );

        return from(
          this.entityModel.findByIdAndUpdate(id, {
            videoDimensions: [
              ...response.videoDimensions.filter(
                (vd) => vd.id !== videoDimensionId
              ),
            ],
          })
        );
      }),
      map((response) => {
        if (!response) {
          throw new BadRequestException('Unable to remove video dimension');
        }
      })
    );
  };
}
