import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Emotion } from '@dark-rush-photography/shared-types';
import { EnvApi } from '@dark-rush-photography/shared-server/types';
import { EmotionMessage } from '@dark-rush-photography/web-socket/types';

export const createOrUpdateEmotion$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  emotionMessage: EmotionMessage
): Observable<EmotionMessage> => {
  const apiEndpoint = `${envApi.drpApi}/admin/v1/emotion`;
  Logger.log(`Calling API ${apiEndpoint}`, createOrUpdateEmotion$.name);
  return httpService
    .post<Emotion>(
      apiEndpoint,
      {
        ...emotionMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          DRP_ADMIN_KEY: envApi.drpAdminKey,
        },
      }
    )
    .pipe(map((axiosResponse) => axiosResponse.data as EmotionMessage));
};
