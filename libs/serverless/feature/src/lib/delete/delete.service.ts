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
  DeleteProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class DeleteService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly deleteProvider: DeleteProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async delete(
    entityId: string,
    entityType: EntityType,
    entityGroup: string,
    entitySlug: string,
    postState: PostState,
    request: AzureRequest
  ): Promise<IHttpResponse> {
    Logger.log('Delete', DeleteService.name);

    const client = getClient(request.context);
    const activityUpload = this.deleteProvider.validateUpload(
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
        tap(this.deleteProvider.logStart),
        switchMapTo(
          this.deleteProvider.delete$(
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
              this.deleteProvider.getOrchestratorInput(
                postState,
                activityUpload.media
              )
            )
          )
        ),
        tap(this.deleteProvider.logOrchestrationStart),
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
