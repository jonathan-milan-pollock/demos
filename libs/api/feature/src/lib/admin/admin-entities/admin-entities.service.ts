import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, map, Observable, of, toArray } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityAdminDto,
  EntityMinimalDto,
  EntityType,
  EntityUpdateDto,
} from '@dark-rush-photography/shared/types';
import {
  getGoogleDrive,
  getGoogleDriveFolderParents$,
} from '@dark-rush-photography/api/util';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityPostProvider,
  ConfigProvider,
  EntityLoadProvider,
  loadEntity,
  loadEntityMinimal,
  validateEntityType,
  validateEntityFound,
  validateNotPublishingEntity,
  EntityPushNotificationsTable,
  ImageRemoveProvider,
  VideoRemoveProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEntitiesService {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    @InjectRepository(EntityPushNotificationsTable)
    private readonly entityPushNotificationsRepository: Repository<EntityPushNotificationsTable>,
    private readonly entityProvider: EntityProvider,
    private readonly entityLoadProvider: EntityLoadProvider,
    private readonly entityPostProvider: EntityPostProvider,
    private readonly imageRemoveProvider: ImageRemoveProvider,
    private readonly videoRemoveProvider: VideoRemoveProvider
  ) {}

  update$(
    entityType: EntityType,
    id: string,
    entityUpdate: EntityUpdateDto
  ): Observable<EntityAdminDto> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateNotPublishingEntity),
      concatMap(() =>
        this.entityModel.findByIdAndUpdate(id, { ...entityUpdate })
      ),
      concatMap(() => this.findOne$(entityType, id))
    );
  }

  watch$(entityType: EntityType, id: string): Observable<EntityAdminDto> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );

    const channel = new EntityPushNotificationsTable();
    channel.key = uuidv4();
    channel.token = uuidv4();

    return from(
      this.entityPushNotificationsRepository.create(channel, channel.key)
    ).pipe(concatMap(() => this.findOne$(entityType, id)));

    /*.pipe(
      concatMap(
        watchFolder$(
          googleDrive,
          channelId,
          channelToken,
          photoAlbumFolderId,
          this.configProvider.googleDrivePushNotificationAddress
        )
      )
    );*/
  }

  publish2$(
    entityType: EntityType,
    id: string,
    entityUpdate: EntityUpdateDto
  ): Observable<EntityAdminDto> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateNotPublishingEntity),
      concatMap(() =>
        this.entityProvider.setIsPublishing$(
          entityType,
          id,
          true,
          this.entityModel
        )
      ),
      concatMap(() =>
        this.entityModel.findByIdAndUpdate(id, { ...entityUpdate })
      ),
      concatMap(() =>
        this.entityProvider.setIsPublishing$(
          entityType,
          id,
          false,
          this.entityModel
        )
      ),
      concatMap(() => this.findOne$(entityType, id))
    );
  }

  publish$(photoAlbumFolderId: string): Observable<boolean> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );

    getGoogleDriveFolderParents$(googleDrive, photoAlbumFolderId);
    // Dark Rush
    // Lightroom Export
    // Shared
    // Watermarked or Unwatermaked
    // Shared With Folder
    // Photo Album

    return of(true);
  }

  websitePost$(entityType: EntityType, id: string): Observable<EntityAdminDto> {
    return from(this.entityModel.findById(id)).pipe(
      map(validateEntityFound),
      map(validateNotPublishingEntity),
      concatMap(() =>
        this.entityProvider.setIsPublishing$(
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
        this.entityProvider.setIsPublishing$(
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
      map(validateNotPublishingEntity),
      concatMap(() =>
        this.entityProvider.setIsPublishing$(
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
        this.entityProvider.setIsPublishing$(
          entityType,
          id,
          false,
          this.entityModel
        )
      ),
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

  findAll$(
    entityType: EntityType,
    group?: string
  ): Observable<EntityMinimalDto[]> {
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
      map(validateNotPublishingEntity),
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
