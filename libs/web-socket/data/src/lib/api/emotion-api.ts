import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Emotion } from '@dark-rush-photography/shared-types';
import { EmotionMessage } from '@dark-rush-photography/web-socket/types';

export const createOrUpdateEmotion$ = (
  drpApi: string,
  httpService: HttpService,
  authToken: string,
  emotionMessage: EmotionMessage
): Observable<EmotionMessage> => {
  const url = `${drpApi}/admin/v1/emotion`;
  Logger.log(url, createOrUpdateEmotion$.name);
  return httpService
    .post<Emotion>(
      url,
      {
        ...emotionMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    .pipe(map((axiosResponse) => axiosResponse.data as EmotionMessage));
};
