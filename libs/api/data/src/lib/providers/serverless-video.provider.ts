import { HttpService, Inject, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import { ENV, Media } from '@dark-rush-photography/shared/types';
import {
  ServerlessCreateImageVideoRequest,
  ServerlessDateVideoCreatedRequest,
  ServerlessExifVideoRequest,
  ServerlessResizeVideoRequest,
} from '@dark-rush-photography/shared-server/types';
import { Env } from '@dark-rush-photography/api/types';
import {
  serverlessCreateImageVideo$,
  serverlessExifVideo$,
  serverlessFindDateVideoCreated$,
  serverlessResizeVideo$,
} from '@dark-rush-photography/api/util';

@Injectable()
export class ServerlessVideoProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService
  ) {}

  serverlessFindDateVideoCreated$(
    serverlessDateVideoCreatedRequest: ServerlessDateVideoCreatedRequest
  ): Observable<string> {
    return serverlessFindDateVideoCreated$(
      this.env.serverless,
      this.httpService,
      serverlessDateVideoCreatedRequest
    );
  }

  serverlessExifVideo$(
    serverlessExifVideoRequest: ServerlessExifVideoRequest
  ): Observable<Media> {
    return serverlessExifVideo$(
      this.env.serverless,
      this.httpService,
      serverlessExifVideoRequest
    );
  }

  serverlessResizeVideo$(
    serverlessResizeVideoRequest: ServerlessResizeVideoRequest
  ): Observable<Media> {
    return serverlessResizeVideo$(
      this.env.serverless,
      this.httpService,
      serverlessResizeVideoRequest
    );
  }

  serverlessCreateImageVideo$(
    serverlessCreateImageVideoRequest: ServerlessCreateImageVideoRequest
  ): Observable<Media> {
    return serverlessCreateImageVideo$(
      this.env.serverless,
      this.httpService,
      serverlessCreateImageVideoRequest
    );
  }
}
