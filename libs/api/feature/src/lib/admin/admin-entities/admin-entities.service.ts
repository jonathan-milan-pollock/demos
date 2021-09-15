import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable, of, toArray } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import {
  EntityAdminDto,
  EntityMinimalDto,
  EntityUpdateDto,
} from '@dark-rush-photography/api/types';
import { getGoogleDrive } from '@dark-rush-photography/api/util';
import {
  DocumentModel,
  Document,
  ConfigProvider,
  EntityLoadProvider,
  loadEntity,
  loadEntityMinimal,
  validateEntityType,
  validateEntityFound,
  validateEntityNotPublishing,
  ImageRemoveProvider,
  VideoRemoveProvider,
  loadDocumentModelsArray,
  EntityPublishProvider,
  validateEntityIsPublished,
  EntitySocialMediaPostProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEntitiesService {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityLoadProvider: EntityLoadProvider,
    private readonly entityPublishProvider: EntityPublishProvider,
    private readonly entitySocialMediaPostProvider: EntitySocialMediaPostProvider,
    private readonly imageRemoveProvider: ImageRemoveProvider,
    private readonly videoRemoveProvider: VideoRemoveProvider
  ) {}

  watch$(entityType: EntityType, id: string): Observable<EntityAdminDto> {
    return this.entityLoadProvider
      .watchFolder$(id)
      .pipe(concatMap(() => this.findOne$(entityType, id)));
  }

  socialMediaPost$(
    entityType: EntityType,
    id: string
  ): Observable<EntityAdminDto> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateEntityIsPublished),
      concatMap(() => this.entitySocialMediaPostProvider.post$(entityType, id)),
      concatMap(() => this.findOne$(entityType, id))
    );
  }

  update$(
    entityType: EntityType,
    id: string,
    entityUpdate: EntityUpdateDto
  ): Observable<EntityAdminDto> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateEntityNotPublishing),
      concatMap(() =>
        this.entityModel.findByIdAndUpdate(id, { ...entityUpdate })
      ),
      concatMap(() => this.findOne$(entityType, id))
    );
  }

  publish$(
    entityType: EntityType,
    id: string,
    renameMediaWithEntitySlug: boolean
  ): Observable<EntityAdminDto> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateEntityNotPublishing),
      concatMap(() => {
        try {
          return this.entityPublishProvider.publish$(
            entityType,
            id,
            renameMediaWithEntitySlug
          );
        } catch {
          return this.setIsPublishing$(entityType, id, false);
        }
      }),
      concatMap(() => this.findOne$(entityType, id))
    );
  }

  setIsPublishing$(
    entityType: EntityType,
    id: string,
    isPublishing: boolean
  ): Observable<void> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      concatMap(() =>
        from(
          this.entityModel.findByIdAndUpdate(id, { isPublishing: isPublishing })
        )
      ),
      map(() => undefined)
    );
  }

  findAllGroups$(entityType: EntityType): Observable<string[]> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );
    return this.entityLoadProvider.loadGroups$(googleDrive, entityType);
  }

  findAll$(
    entityType: EntityType,
    group?: string
  ): Observable<EntityMinimalDto[]> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );

    return this.entityLoadProvider.create$(googleDrive, entityType, group).pipe(
      concatMap(() =>
        from(
          group
            ? this.entityModel.find({ type: entityType, group: group })
            : this.entityModel.find({ type: entityType })
        )
      ),
      concatMap(loadDocumentModelsArray),
      map(loadEntityMinimal),
      toArray<EntityMinimalDto>()
    );
  }

  findOne$(entityType: EntityType, id: string): Observable<EntityAdminDto> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map(loadEntity)
    );
  }

  findIsPublishing$(entityType: EntityType, id: string): Observable<boolean> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map((documentModel) => documentModel.isPublishing)
    );
  }

  delete$(entityType: EntityType, id: string): Observable<void> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateEntityNotPublishing),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      concatMap((documentModel) => {
        if (documentModel.images.length === 0) {
          return of(documentModel);
        }
        return from(documentModel.images).pipe(
          concatMap((image) =>
            this.imageRemoveProvider.remove$(image, documentModel)
          ),
          map(() => documentModel)
        );
      }),
      concatMap((documentModel) => {
        if (documentModel.videos.length === 0) {
          return of(documentModel);
        }
        return from(documentModel.videos).pipe(
          concatMap((video) =>
            this.videoRemoveProvider.remove$(video, documentModel)
          ),
          map(() => documentModel)
        );
      }),
      concatMap(() => from(this.entityModel.findByIdAndDelete(id))),
      map(() => undefined)
    );
  }
}
