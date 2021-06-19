import { HttpService, Injectable, NotFoundException } from '@nestjs/common';

import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Video } from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { toVideo } from '../functions/video.functions';
import { EnvServerless } from '@dark-rush-photography/api/types';
import { getFormData } from '../functions/form-data.functions';

@Injectable()
export class VideoProvider {
  findById$(
    entityModel: Model<DocumentModel>,
    entityId: string,
    videoId: string
  ): Observable<Video> {
    return from(entityModel.findById(entityId).exec()).pipe(
      map((response) => {
        if (!response) throw new NotFoundException('Could not find entity');

        const foundVideo = response.videos.find((v) => v.id === videoId);
        if (!foundVideo)
          throw new NotFoundException('Could not find video by id');

        return toVideo(foundVideo);
      })
    );
  }

  upload$ = (
    envServerless: EnvServerless,
    httpService: HttpService,
    entityId: string,
    file: Express.Multer.File
  ): Observable<Video> => {
    const formData = getFormData(file, file.originalname, entityId);
    return from(
      httpService.post(
        `${envServerless.drpServerlessUrl}/upload-video`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'Content-Length': formData.getLengthSync(),
            'x-functions-key': envServerless.drpServerlessFunctionsKey,
          },
        }
      )
    ).pipe(map((axiosResponse) => axiosResponse.data));
  };
}
