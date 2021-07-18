import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { map, Observable } from 'rxjs';

import { Comment } from '@dark-rush-photography/shared/types';
import { CommentMessage } from '@dark-rush-photography/web-socket/types';

// TODO: Fix the as word
export const createComment$ = (
  drpApiUrl: string,
  httpService: HttpService,
  accessToken: string,
  commentMessage: CommentMessage
): Observable<CommentMessage> => {
  const url = `${drpApiUrl}/admin/v1/comment`;
  Logger.log(url, createComment$.name);
  return httpService
    .post<Comment>(
      url,
      {
        ...commentMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .pipe(map((axiosResponse) => axiosResponse.data as CommentMessage));
};
