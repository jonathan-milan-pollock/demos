import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { map, Observable } from 'rxjs';

import { Emotion } from '@dark-rush-photography/shared/types';
import { EmotionMessage } from '@dark-rush-photography/web-socket/types';

// TODO: Fix the as word
export const createOrUpdateEmotion$ = (
  drpApiUrl: string,
  httpService: HttpService,
  accessToken: string,
  emotionMessage: EmotionMessage
): Observable<EmotionMessage> => {
  const url = `${drpApiUrl}/admin/v1/emotion`;
  Logger.log(url, createOrUpdateEmotion$.name);
  return httpService
    .post<Emotion>(
      url,
      {
        ...emotionMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .pipe(map((axiosResponse) => axiosResponse.data as EmotionMessage));
};
