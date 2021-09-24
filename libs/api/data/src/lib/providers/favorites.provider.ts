import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { combineLatest, concatMap, from, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import {
  DEFAULT_ENTITY_GROUP,
  EntityType,
  FAVORITES_SLUG,
  GoogleDriveFolder,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { FavoritesDto } from '@dark-rush-photography/api/types';
import { getGoogleDriveFolderWithName$ } from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
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

  create$(googleDrive: drive_v3.Drive): Observable<void> {
    return from(
      getGoogleDriveFolderWithName$(
        googleDrive,
        this.configProvider.googleDriveWebsitesWatermarkedFolderId,
        'favorites'
      )
    ).pipe(
      concatMap((favoritesFolder) =>
        getGoogleDriveFolderWithName$(
          googleDrive,
          favoritesFolder.id,
          FAVORITES_SLUG
        )
      ),
      concatMap((favoritesEntityFolder) =>
        combineLatest([
          of(favoritesEntityFolder),
          from(
            this.entityModel.find({
              type: EntityType.Favorites,
              slug: FAVORITES_SLUG,
            })
          ),
        ])
      ),
      concatMap(([favoritesEntityFolder, documentModels]) => {
        const documentModelsArray = loadDocumentModelsArray(documentModels);
        if (documentModelsArray.length > 0) {
          this.logger.log('Found favorites entity');
          return of(documentModelsArray[0]);
        }

        this.logger.log('Creating favorites entity');
        return from(
          new this.entityModel({
            ...loadNewEntity(
              EntityType.Favorites,
              {
                watermarkedType: WatermarkedType.Watermarked,
                group: DEFAULT_ENTITY_GROUP,
                slug: FAVORITES_SLUG,
                isPublic: false,
              },
              favoritesEntityFolder.id
            ),
          }).save()
        );
      }),
      map(() => undefined)
    );
  }

  findNewImagesFolder$(
    googleDrive: drive_v3.Drive,
    googleDriveFolderId: string
  ): Observable<GoogleDriveFolder> {
    return getGoogleDriveFolderWithName$(
      googleDrive,
      googleDriveFolderId,
      'best-37'
    );
  }
}
