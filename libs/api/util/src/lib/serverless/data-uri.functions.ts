import { HttpService, Logger } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { EnvServerless } from '@dark-rush-photography/api/types';
import {
  EntityType,
  ImageDimensionData,
  VideoDimensionData,
} from '@dark-rush-photography/shared/types';

export const serverlessFindDataUriImage$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  imageDimensionId: string,
  imageId: string,
  entityType: EntityType,
  entityId: string
): Observable<ImageDimensionData> => {
  const url = `${envServerless.url}/data-uri-image`;
  Logger.log(url, serverlessFindDataUriImage$.name);
  return from(
    httpService
      .post(
        url,
        {
          imageDimensionId,
          imageId,
          entityType,
          entityId,
        },
        {
          headers: {
            'x-functions-key': envServerless.functionsKey,
          },
        }
      )
      .pipe(map((axiosResponse) => axiosResponse.data))
  );
};

export const serverlessFindDataUriVideo$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  videoDimensionId: string,
  videoId: string,
  entityType: EntityType,
  entityId: string
): Observable<VideoDimensionData> => {
  const {
    url: drpServerlessUrl,
    functionsKey: drpServerlessFunctionsKey,
  } = envServerless;
  const url = `${drpServerlessUrl}/data-uri-video`;
  Logger.log(url, serverlessFindDataUriVideo$.name);
  return from(
    httpService
      .post(
        url,
        {
          videoDimensionId,
          videoId,
          entityType,
          entityId,
        },
        {
          headers: {
            'x-functions-key': drpServerlessFunctionsKey,
          },
        }
      )
      .pipe(map((axiosResponse) => axiosResponse.data))
  );
};
