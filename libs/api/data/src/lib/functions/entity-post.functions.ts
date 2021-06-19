import { HttpService } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DocumentType } from '@dark-rush-photography/shared-types';
import { EnvServerless } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';

export const postEntity$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  entityId: string,
  documentType: DocumentType
): Observable<DocumentModel> => {
  return from(
    httpService.post(
      `${
        envServerless.drpServerlessUrl
      }/post-entity/${documentType.toLowerCase()}/${entityId}`,
      {
        headers: {
          'x-functions-key': envServerless.drpServerlessFunctionsKey,
        },
      }
    )
  ).pipe(map((axiosResponse) => axiosResponse.data));
};
