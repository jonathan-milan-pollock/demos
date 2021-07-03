import { HttpService, Inject, Injectable, Logger } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { getClient } from 'durable-functions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';
import { from } from 'rxjs';
import { map, switchMapTo, tap } from 'rxjs/operators';

import { ENV, MediaState } from '@dark-rush-photography/shared/types';
import {
  ActivityOrchestratorType,
  AzureStorageType,
  Env,
} from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  UploadLightroomImageProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class UploadLightroomImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly uploadLightroomImageProvider: UploadLightroomImageProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async uploadLightroomImage(
    request: AzureRequest,
    lightroomImage: Express.Multer.File
  ): Promise<IHttpResponse> {
    Logger.log('Upload Lightroom Image', UploadLightroomImageService.name);

    const client = getClient(request.context);
    const activityUpload = this.uploadLightroomImageProvider.validateUpload(
      request.body['fileName'],
      lightroomImage
    );

    const blobPath = this.azureStorageProvider.getBlobPath(
      MediaState.New,
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
        tap(this.uploadLightroomImageProvider.logStart),
        switchMapTo(
          this.uploadLightroomImageProvider.createEntityAndImage$(
            this.env,
            this.httpService,
            activityUpload,
            blobPath
          )
        ),
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
