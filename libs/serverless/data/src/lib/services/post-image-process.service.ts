import { Injectable, Logger } from '@nestjs/common';

import { getClient } from 'durable-functions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { PublishedImage } from '@dark-rush-photography/serverless/types';
import { formatMessage } from '@dark-rush-photography/serverless/util';
import { ImageProcessState } from '@dark-rush-photography/shared-types';

@Injectable()
export class PostImageProcessService {
  process$(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestContext: Record<string, any>,
    publishedImage: PublishedImage
  ): Observable<IHttpResponse> {
    Logger.log(formatMessage('PostImage executing'));

    const client = getClient(requestContext);
    return of().pipe(
      tap(() =>
        Logger.log(formatMessage('PostImage starting post image orchestrator'))
      ),
      switchMap(() =>
        from(
          client.startNew('PostImageOrchestrator', undefined, {
            type: ImageProcessState.WebsitePosted,
            publishedImage: publishedImage,
          })
        )
      ),
      tap((instanceId: string) =>
        Logger.log(
          formatMessage(
            `PostImageOrchestrator started orchestration with ID = '${instanceId}'.`
          )
        )
      ),
      map((instanceId: string) =>
        client.createCheckStatusResponse(
          requestContext.bindingData.req,
          instanceId
        )
      )
    );
  }
}
