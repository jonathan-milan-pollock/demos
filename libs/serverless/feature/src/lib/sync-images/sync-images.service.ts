import { Injectable } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { from, lastValueFrom, map } from 'rxjs';
import { getClient } from 'durable-functions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';

import { SyncImage } from '@dark-rush-photography/shared-server/types';
import { OrchestratorType } from '@dark-rush-photography/serverless/types';

@Injectable()
export class SyncImagesService {
  async sync(
    request: AzureRequest,
    syncImages: SyncImage[]
  ): Promise<IHttpResponse> {
    const client = getClient(request.context);
    return lastValueFrom(
      from(
        client.startNew(
          OrchestratorType.SyncImagesOrchestrator,
          undefined,
          syncImages
        )
      ).pipe(
        map((instanceId: string) =>
          client.createCheckStatusResponse(
            request.context.bindingData.req,
            instanceId
          )
        )
      )
    );
  }
}
