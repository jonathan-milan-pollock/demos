import {
  Logger,
  BadRequestException,
  HttpService,
  Injectable,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';

import { getClient } from 'durable-functions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ImageDimensionState } from '@dark-rush-photography/shared-types';
import { AzureStorageContainerType } from '@dark-rush-photography/shared-server/types';
import { Env, ImageActivity } from '@dark-rush-photography/serverless/types';
import { uploadBufferToAzureStorageBlob$ } from '@dark-rush-photography/shared-server/util';
import {
  getBlobPath,
  getPublishedImageForUpload,
} from '@dark-rush-photography/serverless/util';
import { apiCreateEntity$ } from '../api-gateway/entity-api-gateway.functions';

@Injectable()
export class UploadImageActivityProvider {
  readonly logContext = 'UploadImageActivityProvider';

  uploadImage$(
    env: Env,
    httpService: HttpService,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestContext: Record<string, any>,
    uploadedFileName: string,
    image: Express.Multer.File
  ): Observable<IHttpResponse> {
    if (!image) {
      throw new BadRequestException('Image must be provided for image upload');
    }

    const publishedImage = getPublishedImageForUpload(uploadedFileName);
    if (!publishedImage)
      throw new BadRequestException(
        'Publish image was not created from upload'
      );
    Logger.log('Published image was created from upload', this.logContext);

    const client = getClient(requestContext);
    return uploadBufferToAzureStorageBlob$(
      image.buffer,
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPath(ImageDimensionState.Uploaded, publishedImage)
    ).pipe(
      tap(() =>
        Logger.log('Starting upload image orchestrator', this.logContext)
      ),
      switchMap(() => apiCreateEntity$(env, httpService, publishedImage)),
      switchMap(() =>
        from(
          client.startNew('UploadImageOrchestrator', undefined, {
            state: ImageDimensionState.Uploaded,
            publishedImage: publishedImage,
          } as ImageActivity)
        )
      ),
      tap((instanceId: string) =>
        Logger.log(
          `UploadImageOrchestrator started orchestration with ID = '${instanceId}'.`,
          this.logContext
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
