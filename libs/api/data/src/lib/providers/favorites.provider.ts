import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { combineLatest, concatMap, from, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import { EntityType, FavoritesDto } from '@dark-rush-photography/shared/types';
import {
  DEFAULT_ENTITY_GROUP,
  FAVORITES_SLUG,
  GoogleDriveFolder,
} from '@dark-rush-photography/api/types';
import { getGoogleDriveFolderWithName$ } from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { loadPublicContent } from '../content/public-content.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class FavoritesProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(FavoritesProvider.name);
  }

  loadFavoritesPublic(documentModel: DocumentModel): FavoritesDto {
    const publicContent = loadPublicContent(documentModel);
    return {
      images: publicContent.images.map(loadMinimalPublicImage),
    };
  }

  create$(): Observable<void> {
    return from(
      this.entityModel.find({
        type: EntityType.Favorites,
        slug: FAVORITES_SLUG,
      })
    ).pipe(
      concatMap((documentModels) => {
        const documentModelsArray = loadDocumentModelsArray(documentModels);
        if (documentModelsArray.length > 0) {
          this.logger.log('Found favorites entity');
          return of(documentModelsArray[0]);
        }

        this.logger.log('Creating favorites entity');
        return from(
          new this.entityModel({
            ...loadNewEntity(EntityType.Favorites, {
              group: DEFAULT_ENTITY_GROUP,
              slug: FAVORITES_SLUG,
              isPosted: false,
            }),
          }).save()
        );
      }),
      map(() => undefined)
    );
  }

  findNewImagesFolder$(
    googleDrive: drive_v3.Drive,
    entityId: string
  ): Observable<{
    documentModel: DocumentModel;
    imagesFolder: GoogleDriveFolder;
  }> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            this.configProvider.googleDriveWebsitesWatermarkedFolderId,
            'favorites'
          ),
        ])
      ),
      concatMap(([documentModel, favoritesEntityFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            favoritesEntityFolder.id,
            'best-37'
          ),
        ])
      ),
      map(([documentModel, entityImagesFolder]) => {
        return {
          documentModel: documentModel,
          imagesFolder: entityImagesFolder,
        };
      })
    );
  }
}
