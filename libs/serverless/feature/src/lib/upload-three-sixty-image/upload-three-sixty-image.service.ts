import { Inject, Injectable, Logger } from '@nestjs/common';
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
  UploadThreeSixtyImageProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class UploadThreeSixtyImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly uploadThreeSixtyImageProvider: UploadThreeSixtyImageProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async uploadThreeSixtyImage(
    entityId: string,
    entityType: EntityType,
    entityGroup: string,
    entitySlug: string,
    request: AzureRequest,
    threeSixtyImage: Express.Multer.File
  ): Promise<IHttpResponse> {
    Logger.log('Upload Three Sixty Image', UploadThreeSixtyImageService.name);

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
        AzureStorageType.Private,
        activityUpload.file.buffer,
        this.azureStorageProvider.getBlobPath(
          MediaState.New,
          activityUpload.media
        )
      )
      .pipe(
        tap(this.uploadThreeSixtyImageProvider.logStart),
        switchMapTo(
          from(
            client.startNew(
              ActivityOrchestratorType.UploadImage,
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
