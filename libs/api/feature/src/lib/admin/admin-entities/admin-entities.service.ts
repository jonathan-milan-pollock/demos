import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  catchError,
  concatMap,
  from,
  last,
  map,
  Observable,
  of,
  toArray,
} from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityType,
  EntityUpdate,
  EntityWithGroupType,
} from '@dark-rush-photography/shared/types';
import {
  EntityAdminDto,
  EntityMinimalDto,
} from '@dark-rush-photography/api/types';
import { getGoogleDrive } from '@dark-rush-photography/api/util';
import {
  DocumentModel,
  Document,
  ConfigProvider,
  EntityProvider,
  EntityPublishProvider,
  EntitySocialMediaPostProvider,
  ImageRemoveProvider,
  loadEntity,
  loadEntityMinimal,
  validateEntityFound,
  validateEntityIsPublished,
  validateEntityNotPublishing,
  validateEntityType,
  VideoRemoveProvider,
  validateEntityGroupValid,
  validateEntityGroupProvided,
  EntityGroupProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEntitiesService {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly entityGroupProvider: EntityGroupProvider,
    private readonly entityPublishProvider: EntityPublishProvider,
    private readonly entitySocialMediaPostProvider: EntitySocialMediaPostProvider,
    private readonly imageRemoveProvider: ImageRemoveProvider,
    private readonly videoRemoveProvider: VideoRemoveProvider
  ) {}

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
    entityUpdate: EntityUpdate
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
      map((documentModel) => validateEntityType(entityType, documentModel)),
      concatMap((documentModel) => {
        return this.entityPublishProvider
          .publish$(entityType, documentModel, renameMediaWithEntitySlug)
          .pipe(
            catchError(() => of(this.setIsPublishing$(entityType, id, false)))
          );
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
    entityType: EntityType,
    group?: string
  ): Observable<EntityMinimalDto[]> {
    let validatedGroup: string;
    validateEntityGroupValid(entityType, group);
    if (group) {
      validatedGroup = validateEntityGroupProvided(group);
    }

    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );

    return this.entityProvider.create$(googleDrive, entityType, group).pipe(
      concatMap(() =>
        from(
          group
            ? this.entityGroupProvider.findAllForGroup$(
                entityType,
                validatedGroup
              )
            : this.entityProvider.findAll$(entityType)
        )
      ),
      concatMap((documentModels) => {
        if (documentModels.length === 0) return of([]);

        return from(documentModels).pipe(
          map(loadEntityMinimal),
          toArray<EntityMinimalDto>()
        );
      })
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
            this.imageRemoveProvider.removeImage$(image, documentModel._id)
          ),
          last(),
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
          last(),
          map(() => documentModel)
        );
      }),
      concatMap(() => from(this.entityModel.findByIdAndDelete(id))),
      map(() => undefined)
    );
  }
}
