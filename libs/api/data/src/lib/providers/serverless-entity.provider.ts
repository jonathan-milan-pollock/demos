import { HttpService, Inject, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, mapTo, switchMapTo } from 'rxjs/operators';

import {
  EntityType,
  EntityUpdate,
  ENV,
} from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  serverlessDeleteEntityProcess$,
  serverlessMediaProcess$,
  serverlessPostEntityProcess$,
  serverlessUpdateEntityProcess$,
} from '@dark-rush-photography/api/util';
import {
  validateEntityType,
  validateEntityFound,
  validateEntityNotProcessing,
} from '../entities/entity-validation.functions';

@Injectable()
export class ServerlessEntityProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService
  ) {}

  updateProcess$(
    entityType: EntityType,
    entityId: string,
    entityModel: Model<DocumentModel>,
    entityUpdate: EntityUpdate
  ): Observable<void> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map(validateEntityNotProcessing),
      switchMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      switchMapTo(
        serverlessUpdateEntityProcess$(
          this.env.serverless,
          this.httpService,
          entityType,
          entityId,
          entityUpdate
        )
      ),
      mapTo(undefined)
    );
  }

  postProcess$(
    entityType: EntityType,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map(validateEntityNotProcessing),
      switchMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      switchMapTo(
        serverlessPostEntityProcess$(
          this.env.serverless,
          this.httpService,
          entityType,
          entityId
        )
      ),
      mapTo(undefined)
    );
  }

  mediaProcess$(
    entityType: EntityType,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map(validateEntityNotProcessing),
      switchMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      switchMapTo(
        serverlessMediaProcess$(
          this.env.serverless,
          this.httpService,
          entityType,
          entityId
        )
      ),
      mapTo(undefined)
    );
  }

  deleteProcess$(
    entityType: EntityType,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<void> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map(validateEntityNotProcessing),
      switchMapTo(
        entityModel.findByIdAndUpdate(entityId, { isProcessing: true })
      ),
      switchMapTo(
        serverlessDeleteEntityProcess$(
          this.env.serverless,
          this.httpService,
          entityType,
          entityId
        )
      ),
      mapTo(undefined)
    );
  }
}
