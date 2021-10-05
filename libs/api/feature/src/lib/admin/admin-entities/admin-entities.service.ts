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
import {
  ConfigProvider,
  Document,
  DocumentModel,
  EntityCreateProvider,
  EntityDeleteProvider,
  EntityFindProvider,
  EntityGroupProvider,
  EntityPublishProvider,
  EntitySocialMediaPostProvider,
  ImageLoadNewProvider,
  loadEntityAdmin,
  loadUpdateEntity,
  validateEntityFound,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEntitiesService {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityGroupProvider: EntityGroupProvider,
    private readonly entityCreateProvider: EntityCreateProvider,
    private readonly entityFindProvider: EntityFindProvider,
    private readonly entityPublishProvider: EntityPublishProvider,
    private readonly entitySocialMediaPostProvider: EntitySocialMediaPostProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider,
    private readonly imageLoadNewProvider: ImageLoadNewProvider
  ) {}

  loadNewImages$(entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap(() => this.imageLoadNewProvider.loadNewImages$(entityId)),
      map(() => undefined)
    );
  }

  update$(entityId: string, entityUpdate: EntityUpdate): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap(() =>
        this.entityModel.findByIdAndUpdate(entityId, {
          ...loadUpdateEntity(entityUpdate),
        })
      ),
      map(() => undefined)
    );
  }

  publish$(entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap(() => this.entityPublishProvider.publish$(entityId)),
      map(() => undefined)
    );
  }

  socialMediaPost$(entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap(() =>
        this.entitySocialMediaPostProvider.postSocialMedia$(entityId)
      ),
      map(() => undefined)
    );
  }

  setIsProcessing$(entityId: string, isProcessing: boolean): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap(() =>
        from(this.entityModel.findByIdAndUpdate(entityId, { isProcessing }))
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
          this.entityFindProvider.findAll$(entityWithoutGroupType)
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
          this.entityFindProvider.findAllForGroup$(entityWithGroupType, group)
        )
      );
  }

  findOne$(entityId: string): Observable<EntityAdmin> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map(loadEntityAdmin)
    );
  }

  findIsProcessing$(entityId: string): Observable<boolean> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => documentModel.isProcessing)
    );
  }

  delete$(entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      concatMap((documentModel) => {
        if (!documentModel) return of(undefined);

        return this.entityDeleteProvider.delete$(entityId);
      }),
      map(() => undefined)
    );
  }
}
