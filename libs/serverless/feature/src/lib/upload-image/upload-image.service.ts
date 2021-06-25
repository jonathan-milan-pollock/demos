import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { AzureRequest } from '@nestjs/azure-func-http';
import { HttpService, Inject, Injectable } from '@nestjs/common';

import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/serverless/types';
import { UploadImageActivityProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class UploadImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly uploadImageActivityProvider: UploadImageActivityProvider
  ) {}

  async uploadImage(
    request: AzureRequest,
    image: Express.Multer.File
  ): Promise<IHttpResponse> {
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
