import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Comment } from '@dark-rush-photography/shared-types';
import { CommentMessage } from '@dark-rush-photography/web-socket/types';

export const createOrUpdateComment$ = (
  drpApi: string,
  httpService: HttpService,
  authToken: string,
  commentMessage: CommentMessage
): Observable<CommentMessage> => {
  const apiEndpoint = `${drpApi}/admin/v1/comment`;
  Logger.log(`Calling API ${apiEndpoint}`, createOrUpdateComment$.name);
  return httpService
    .post<Comment>(
      apiEndpoint,
      {
        ...commentMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    .pipe(map((axiosResponse) => axiosResponse.data as CommentMessage));
};
