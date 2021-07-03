import { HttpService, Inject, Injectable, Logger } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { getClient } from 'durable-functions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';
import { from } from 'rxjs';
import { map, switchMapTo, tap } from 'rxjs/operators';

import {
  EntityType,
  ENV,
  MediaState,
} from '@dark-rush-photography/shared/types';
import {
  ActivityOrchestratorType,
  AzureStorageType,
  Env,
} from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  MediaProcessProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class MediaProcessService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly mediaProcessProvider: MediaProcessProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async mediaProcess(
    entityId: string,
    entityType: EntityType,
    entityGroup: string,
    entitySlug: string,
    mediaState: MediaState,
    request: AzureRequest
  ): Promise<IHttpResponse> {
    Logger.log('Media Process', MediaProcessService.name);

    const client = getClient(request.context);
    const activityUpload = this.mediaProcessProvider.validateUpload(
      request.body['fileName'],
      entityId,
      entityType,
      entityGroup,
      entitySlug
    );

    const blobPath = this.azureStorageProvider.getBlobPath(
      mediaState,
      activityUpload.media
    );
    return this.azureStorageProvider
      .uploadBufferToBlob$(
        this.env.azureStorageConnectionString,
        AzureStorageType.Private,
        activityUpload.file.buffer,
        blobPath
      )
      .pipe(
        tap(this.mediaProcessProvider.logStart),
        switchMapTo(
          this.mediaProcessProvider.mediaProcess$(
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
              this.mediaProcessProvider.getOrchestratorInput(
                mediaState,
                activityUpload.media
              )
            )
          )
        ),
        tap(this.mediaProcessProvider.logOrchestrationStart),
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
