import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityAdmin,
  EntityMinimalAdmin,
  EntityUpdate,
  EntityWithGroupType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import { getGoogleDrive } from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  findByIdAndUpdateIsProcessing$,
  findEntityById$,
  updateEntity$,
} from '../entities/entity-repository.functions';
import { loadEntityAdmin } from '../entities/entity-load-admin.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { ConfigProvider } from '../providers/config.provider';
import { EntityGroupProvider } from '../providers/entity-group.provider';
import { EntityCreateProvider } from '../providers/entity-create.provider';
import { EntityFindAllProvider } from '../providers/entity-find-all.provider';
import { EntityLoadNewImagesProvider } from '../providers/entity-load-new-images.provider';
import { EntityPublishProvider } from '../providers/entity-publish.provider';
import { EntityDeleteProvider } from '../providers/entity-delete.provider';

@Injectable()
export class AdminEntitiesService {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityGroupProvider: EntityGroupProvider,
    private readonly entityCreateProvider: EntityCreateProvider,
    private readonly entityFindAllProvider: EntityFindAllProvider,
    private readonly entityLoadNewImagesProvider: EntityLoadNewImagesProvider,
    private readonly entityPublishProvider: EntityPublishProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider
  ) {}

  update$(entityId: string, entityUpdate: EntityUpdate): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap(() => updateEntity$(entityId, entityUpdate, this.entityModel)),
      map(() => undefined)
    );
  }

  loadNewImages$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap(() => this.entityLoadNewImagesProvider.loadNewImages$(entityId))
    );
  }

  publish$(entityId: string, postSocialMedia: boolean): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap(() =>
        this.entityPublishProvider.publishEntity$(entityId, postSocialMedia)
      )
    );
  }

  setIsProcessing$(entityId: string, isProcessing: boolean): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap(() =>
        findByIdAndUpdateIsProcessing$(entityId, isProcessing, this.entityModel)
      ),
      map(() => undefined)
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
  ): Observable<EntityMinimalAdmin[]> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );

    return this.entityCreateProvider
      .create$(googleDrive, entityWithoutGroupType)
      .pipe(
        concatMap(() =>
          this.entityFindAllProvider.findAllEntities$(entityWithoutGroupType)
        )
      );
  }

  findAllForGroup$(
    entityWithGroupType: EntityWithGroupType,
    group: string
  ): Observable<EntityMinimalAdmin[]> {
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
        )
      );
  }

  findOne$(entityId: string): Observable<EntityAdmin> {
    return from(findEntityById$(entityId, this.entityModel)).pipe(
      map(validateEntityFound),
      map(loadEntityAdmin)
    );
  }

  delete$(entityId: string): Observable<void> {
    return from(findEntityById$(entityId, this.entityModel)).pipe(
      concatMap((documentModel) => {
        if (!documentModel) return of(undefined);

        return this.entityDeleteProvider.deleteEntity$(entityId);
      })
    );
  }
}
