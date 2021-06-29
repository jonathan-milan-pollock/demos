import { BadRequestException, HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Image } from '@dark-rush-photography/shared-types';
import { ActivityMedia, Env } from '@dark-rush-photography/serverless/types';
import { apiAuth$ } from './api-auth.functions';

export const addImage$ = (
  env: Env,
  httpService: HttpService,
  activityMedia: ActivityMedia,
  dateCreated: string
): Observable<Image> => {
  const url = `${env.api.drpApi}/admin/v1/images?entityId=${activityMedia.entityId}`;
  Logger.log(url, addImage$.name);
  Logger.log('fileName' + activityMedia.fileName, addImage$.name);
  Logger.log('dateCreated' + dateCreated, addImage$.name);

  //TODO: Improve this and what if image doesn't have a create date???
  const dateSplit = dateCreated.split(' ');
  const isoDate = dateSplit[0].replace(/:/g, '-') + 'T' + dateSplit[1] + 'Z';
  Logger.log('isoDate: ' + isoDate);

  const entityId = activityMedia.entityId;
  if (!entityId) {
    const message = 'Entity id is required for adding an image';
    Logger.log(message, addImage$.name);
    throw new BadRequestException(message);
  }

  return apiAuth$(env.apiAuth, httpService).pipe(
    switchMap((authToken) =>
      httpService.post<Image>(
        url,
        {
          fileName: activityMedia.fileName,
          dateCreated: isoDate,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'X-DRP-API-ADMIN-KEY': env.api.drpApiAdminKey,
          },
        }
      )
    ),
    map((axiosResponse) => axiosResponse.data)
  );
};
