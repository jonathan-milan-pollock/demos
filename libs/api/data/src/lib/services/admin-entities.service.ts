import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  CronProcessType,
  EntityAdmin,
  EntityOrders,
  EntityUpdate,
  EntityWithGroupType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import { getGoogleDrive } from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  createTestEntity$,
  findByIdAndSoftDelete$,
  findEntityById$,
  updateEntity$,
} from '../entities/entity-repository.functions';
import { loadEntityAdmin } from '../entities/entity-load-admin.functions';
import { startCronProcessType } from '../cron-processes/cron-process-start.functions';
import { validatePublishEntity } from '../entities/entity-publish-validation.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { ConfigProvider } from '../providers/config.provider';
import { EntityGroupProvider } from '../providers/entity-group.provider';
import { EntityCreateProvider } from '../providers/entity-create.provider';
import { EntityFindAllProvider } from '../providers/entity-find-all.provider';
import { EntityOrderProvider } from '../providers/entity-order.provider';
import { CronProcessRepositoryProvider } from '../providers/cron-process-repository.provider';

@Injectable()
export class AdminEntitiesService {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityGroupProvider: EntityGroupProvider,
    private readonly entityCreateProvider: EntityCreateProvider,
    private readonly entityFindAllProvider: EntityFindAllProvider,
    private readonly entityOrderProvider: EntityOrderProvider,
    @Inject(CronProcessRepositoryProvider.name)
    private readonly cronProcessRepositoryProvider: CronProcessRepositoryProvider
  ) {}

  createTest$(): Observable<EntityAdmin> {
    return createTestEntity$(this.entityModel).pipe(map(loadEntityAdmin));
  }

  order$(entityOrders: EntityOrders): Observable<void> {
    return this.entityOrderProvider.order$(entityOrders);
  }

  update$(entityId: string, entityUpdate: EntityUpdate): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap(() => updateEntity$(entityId, entityUpdate, this.entityModel)),
      map(() => undefined)
    );
  }

  publish$(entityId: string, postSocialMedia: boolean): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      map(validatePublishEntity),
      concatMap((documentModel) =>
        this.cronProcessRepositoryProvider.create$(
          startCronProcessType(
            CronProcessType.PublishEntity,
            documentModel.type,
            documentModel._id,
            documentModel.group,
            documentModel.slug,
            postSocialMedia
          )
        )
      )
    );
  }

  findGroups$(entityWithGroupType: EntityWithGroupType): Observable<string[]> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );
    return this.entityGroupProvider.findGroups$(
      googleDrive,
      entityWithGroupType
    );
  }

  findAll$(
    entityWithoutGroupType: EntityWithoutGroupType
  ): Observable<EntityAdmin[]> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );

    return this.entityCreateProvider
      .create$(googleDrive, entityWithoutGroupType)
      .pipe(
        concatMap(() =>
          this.entityFindAllProvider.findAllEntities$(entityWithoutGroupType)
        ),
        map((entities) =>
          entities.sort((entityA, entityB) => entityA.order - entityB.order)
        )
      );
  }

  findAllForGroup$(
    entityWithGroupType: EntityWithGroupType,
    group: string
  ): Observable<EntityAdmin[]> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );

    return this.entityCreateProvider
      .createForGroup$(googleDrive, entityWithGroupType, group)
      .pipe(
        concatMap(() =>
          this.entityFindAllProvider.findAllEntitiesForGroup$(
            entityWithGroupType,
            group
          )
        ),
        map((entities) =>
          entities.sort((entityA, entityB) => entityA.order - entityB.order)
        )
      );
  }

  findOne$(entityId: string): Observable<EntityAdmin> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      map(loadEntityAdmin)
    );
  }

  delete$(entityId: string): Observable<void> {
    return findByIdAndSoftDelete$(entityId, this.entityModel).pipe(
      concatMap((documentModel) => {
        if (!documentModel) return of(undefined);

        return this.cronProcessRepositoryProvider.create$(
          startCronProcessType(
            CronProcessType.DeleteEntity,
            documentModel.type,
            documentModel._id,
            documentModel.group,
            documentModel.slug
          )
        );
      })
    );
  }
}
