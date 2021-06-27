import { Inject, Injectable } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { getClient } from 'durable-functions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';
import { from } from 'rxjs';
import { map, switchMapTo, tap } from 'rxjs/operators';

import { EntityType, ENV } from '@dark-rush-photography/shared-types';
import {
  ActivityOrchestratorType,
  AzureStorageContainerType,
  Env,
} from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  UploadThreeSixtyImageProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class UploadThreeSixtyImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly uploadThreeSixtyImageProvider: UploadThreeSixtyImageProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async upload(
    entityId: string,
    entityType: EntityType,
    entityGroup: string,
    entitySlug: string,
    request: AzureRequest,
    threeSixtyImage: Express.Multer.File
  ): Promise<IHttpResponse> {
    const client = getClient(request.context);
    const activityUpload = this.uploadThreeSixtyImageProvider.validateUpload(
      request.body['fileName'],
      entityId,
      entityType,
      entityGroup,
      entitySlug,
      threeSixtyImage
    );

    return this.azureStorageProvider
      .uploadBufferToBlob$(
        this.env.azureStorageConnectionString,
        AzureStorageContainerType.Private,
        activityUpload.file.buffer,
        this.uploadThreeSixtyImageProvider.getBlobPath(activityUpload.media)
      )
      .pipe(
        tap(this.uploadThreeSixtyImageProvider.logStart),
        switchMapTo(
          from(
            client.startNew(
              ActivityOrchestratorType.UploadThreeSixtyImage,
              undefined,
              this.uploadThreeSixtyImageProvider.getOrchestratorInput(
                activityUpload.media
              )
            )
          )
        ),
        tap(this.uploadThreeSixtyImageProvider.logOrchestrationStart),
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
