import { Injectable, Logger } from '@nestjs/common';

import { getClient } from 'durable-functions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';
import { from, Observable, of } from 'rxjs';
import { map, switchMapTo, tap } from 'rxjs/operators';

import {
  Activity,
  ActivityMedia,
  ActivityType,
} from '@dark-rush-photography/serverless/types';

@Injectable()
export class PostImageProvider {
  postImage$(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestContext: Record<string, any>,
    media: ActivityMedia
  ): Observable<IHttpResponse> {
    const client = getClient(requestContext);
    return of().pipe(
      tap(() =>
        Logger.log(
          'PostImage starting post image orchestrator',
          PostImageProvider.name
        )
      ),
      switchMapTo(
        from(
          client.startNew('PostImageOrchestrator', undefined, {
            type: ActivityType.WebsitePost,
            media: media,
          } as Activity)
        )
      ),
      tap((instanceId: string) =>
        Logger.log(
          `PostImageOrchestrator started orchestration with ID = '${instanceId}'.`,
          PostImageProvider.name
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
