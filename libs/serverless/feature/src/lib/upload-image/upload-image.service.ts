import { AzureRequest } from '@nestjs/azure-func-http';
import { HttpService, Inject, Injectable, Logger } from '@nestjs/common';

import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/serverless/types';
import { UploadImageActivityProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class UploadImageService {
  readonly logContext = 'UploadImageService';

  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly uploadImageActivityProvider: UploadImageActivityProvider
  ) {}

  async uploadImage(
    request: AzureRequest,
    image: Express.Multer.File
  ): Promise<IHttpResponse> {
    Logger.log('Uploading image', this.logContext);
    return this.uploadImageActivityProvider
      .uploadImage$(
        this.env,
        this.httpService,
        request.context,
        request.body['fileName'],
        image
      )
      .toPromise();
  }
}
