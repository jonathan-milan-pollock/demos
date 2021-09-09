import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable, toArray } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityAdminDto,
  EntityMinimalDto,
  EntityType,
  EntityUpdateDto,
} from '@dark-rush-photography/shared/types';
import { getGoogleDrive } from '@dark-rush-photography/api/util';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityUpdateProvider,
  EntityDeleteProvider,
  EntityPostProvider,
  ConfigProvider,
  EntityLoadProvider,
  loadEntity,
  loadEntityMinimal,
  validateEntityType,
  validateEntityFound,
  validateNotProcessingEntity,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEntitiesService {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly entityLoadProvider: EntityLoadProvider,
    private readonly entityUpdateProvider: EntityUpdateProvider,
    private readonly entityPostProvider: EntityPostProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider
  ) {}

  update$(
    entityType: EntityType,
    id: string,
    entityUpdate: EntityUpdateDto
  ): Observable<EntityAdminDto> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateNotProcessingEntity),
      concatMap(() =>
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          true,
          this.entityModel
        )
      ),
      concatMap(() =>
        this.entityUpdateProvider.update$(entityType, id, this.entityModel)
      ),
      concatMap(() =>
        this.entityModel.findByIdAndUpdate(id, { ...entityUpdate })
      ),
      concatMap(() =>
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          false,
          this.entityModel
        )
      ),
      concatMap(() => this.findOne$(entityType, id))
    );
  }

  websitePost$(entityType: EntityType, id: string): Observable<EntityAdminDto> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateNotProcessingEntity),
      concatMap(() =>
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          true,
          this.entityModel
        )
      ),
      concatMap(() =>
        this.entityPostProvider.post$(entityType, id, this.entityModel)
      ),
      concatMap(() =>
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          false,
          this.entityModel
        )
      ),
      concatMap(() => this.findOne$(entityType, id))
    );
  }

  socialMediaPost$(
    entityType: EntityType,
    id: string
  ): Observable<EntityAdminDto> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateNotProcessingEntity),
      concatMap(() =>
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          true,
          this.entityModel
        )
      ),
      concatMap(() =>
        this.entityPostProvider.post$(entityType, id, this.entityModel)
      ),
      concatMap(() =>
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          false,
          this.entityModel
        )
      ),
      concatMap(() => this.findOne$(entityType, id))
    );
  }

  setIsProcessing$(
    entityType: EntityType,
    id: string,
    isProcessing: boolean
  ): Observable<void> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      concatMap(() =>
        from(this.entityModel.findByIdAndUpdate(id, { isProcessing }))
      ),
      map(() => undefined)
    );
  }

  findAll$(entityType: EntityType): Observable<EntityMinimalDto[]> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );
    return this.entityLoadProvider.load(googleDrive, entityType).pipe(
      concatMap(() =>
        this.entityProvider.findAll$(entityType, this.entityModel)
      ),
      map(loadEntityMinimal),
      toArray<EntityMinimalDto>()
    );
  }

  findOne$(entityType: EntityType, id: string): Observable<EntityAdminDto> {
    return this.entityProvider.findOne$(id, this.entityModel).pipe(
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map(loadEntity)
    );
  }

  findAllGroups$(entityType: EntityType): Observable<string[]> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );
    return this.entityLoadProvider.loadGroups$(googleDrive, entityType);
  }

  findAllInGroup$(
    entityType: EntityType,
    group: string
  ): Observable<EntityMinimalDto[]> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );
    return this.entityLoadProvider
      .loadForGroup$(googleDrive, entityType, group)
      .pipe(
        concatMap(() =>
          this.entityProvider.findAllInGroup$(
            entityType,
            group,
            this.entityModel
          )
        ),
        map(loadEntityMinimal),
        toArray<EntityMinimalDto>()
      );
  }

  findIsProcessing$(entityType: EntityType, id: string): Observable<boolean> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map((documentModel) => documentModel.isProcessing)
    );
  }

  delete$(entityType: EntityType, id: string): Observable<void> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateNotProcessingEntity),
      concatMap(() =>
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          true,
          this.entityModel
        )
      ),
      concatMap(() =>
        this.entityDeleteProvider.delete$(entityType, id, this.entityModel)
      )
    );
  }
}
