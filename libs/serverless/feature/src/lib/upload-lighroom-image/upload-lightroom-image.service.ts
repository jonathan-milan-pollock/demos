import { HttpService, Inject, Injectable } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { getClient } from 'durable-functions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';
import { from } from 'rxjs';
import { map, switchMapTo, tap } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared-types';
import {
  ActivityOrchestratorType,
  AzureStorageContainerType,
  Env,
} from '@dark-rush-photography/serverless/types';
import {
  ApiEntityCreateProvider,
  AzureStorageProvider,
  UploadLightroomImageProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class UploadLightroomImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly uploadLightroomImageProvider: UploadLightroomImageProvider,
    private readonly azureStorageProvider: AzureStorageProvider,
    private readonly apiEntityCreateProvider: ApiEntityCreateProvider
  ) {}

  async upload(
    request: AzureRequest,
    lightroomImage: Express.Multer.File
  ): Promise<IHttpResponse> {
    const client = getClient(request.context);
    const activityUpload = this.uploadLightroomImageProvider.validateUpload(
      request.body['fileName'],
      lightroomImage
    );

    return this.azureStorageProvider
      .uploadBufferToBlob$(
        this.env.azureStorageConnectionString,
        AzureStorageContainerType.Private,
        activityUpload.file.buffer,
        this.uploadLightroomImageProvider.getBlobPath(activityUpload.media)
      )
      .pipe(
        tap(this.uploadLightroomImageProvider.logStart),
        switchMapTo(
          this.apiEntityCreateProvider.createEntity$(
            this.env,
            this.httpService,
            activityUpload.media
          )
        ),
        tap((entity) => {
          activityUpload.media = {
            ...activityUpload.media,
            entityId: entity.id,
          };
        }),
        switchMapTo(
          from(
            client.startNew(
              ActivityOrchestratorType.UploadImage,
              undefined,
              this.uploadLightroomImageProvider.getOrchestratorInput(
                activityUpload.media
              )
            )
          )
        ),
        tap(this.uploadLightroomImageProvider.logOrchestrationStart),
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
