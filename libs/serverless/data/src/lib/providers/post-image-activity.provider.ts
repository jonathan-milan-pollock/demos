import { Injectable, Logger } from '@nestjs/common';

import { getClient } from 'durable-functions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import {
  ImageActivity,
  PublishedImage,
} from '@dark-rush-photography/serverless/types';
import { ImageDimensionState } from '@dark-rush-photography/shared-types';

@Injectable()
export class PostImageActivityProvider {
  postImage$(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestContext: Record<string, any>,
    publishedImage: PublishedImage
  ): Observable<IHttpResponse> {
    const logContext = 'PostImageActivityProvider';
    const client = getClient(requestContext);
    return of().pipe(
      tap(() =>
        Logger.log('PostImage starting post image orchestrator', logContext)
      ),
      switchMap(() =>
        from(
          client.startNew('PostImageOrchestrator', undefined, {
            state: ImageDimensionState.WebsitePosted,
            publishedImage: publishedImage,
          } as ImageActivity)
        )
      ),
      tap((instanceId: string) =>
        Logger.log(
          `PostImageOrchestrator started orchestration with ID = '${instanceId}'.`,
          logContext
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
