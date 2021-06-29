import { HttpService, Inject, Injectable, Logger } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { getClient } from 'durable-functions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';
import { from } from 'rxjs';
import { map, switchMapTo, tap } from 'rxjs/operators';

import {
  EntityType,
  ENV,
  PostState,
} from '@dark-rush-photography/shared-types';
import {
  ActivityOrchestratorType,
  AzureStorageContainerType,
  Env,
} from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  PostProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class PostService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly postProvider: PostProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async post(
    entityId: string,
    entityType: EntityType,
    entityGroup: string,
    entitySlug: string,
    postState: PostState,
    request: AzureRequest
  ): Promise<IHttpResponse> {
    Logger.log('Post', PostService.name);

    const client = getClient(request.context);
    const activityUpload = this.postProvider.validateUpload(
      request.body['fileName'],
      entityId,
      entityType,
      entityGroup,
      entitySlug
    );

    const blobPath = this.azureStorageProvider.getBlobPath(
      postState,
      activityUpload.media
    );
    return this.azureStorageProvider
      .uploadBufferToBlob$(
        this.env.azureStorageConnectionString,
        AzureStorageContainerType.Private,
        activityUpload.file.buffer,
        blobPath
      )
      .pipe(
        tap(this.postProvider.logStart),
        switchMapTo(
          this.postProvider.post$(
            this.env,
            this.httpService,
            activityUpload,
            blobPath
          )
        ),
        switchMapTo(
          from(
            client.startNew(
              ActivityOrchestratorType.Delete,
              undefined,
              this.postProvider.getOrchestratorInput(
                postState,
                activityUpload.media
              )
            )
          )
        ),
        tap(this.postProvider.logOrchestrationStart),
        map((instanceId: string) =>
          client.createCheckStatusResponse(
            request.context.bindingData.req,
            instanceId
          )
        )
      )
      .toPromise();
  }
}
