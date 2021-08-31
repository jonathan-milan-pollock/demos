import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { combineLatest, concatMap, from, mapTo, Observable, of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { EntityType, FavoritesDto } from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/shared-server/types';
import { FAVORITES_SLUG } from '@dark-rush-photography/api/types';
import { getGoogleDriveFolderWithName$ } from '@dark-rush-photography/shared-server/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import { loadPublicContent } from '../content/public-content.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { ConfigProvider } from './config.provider';
import { GoogleDriveWebsitesProvider } from './google-drive-websites.provider';

@Injectable()
export class FavoritesProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly googleDriveWebsitesProvider: GoogleDriveWebsitesProvider
  ) {
    this.logger = new Logger(FavoritesProvider.name);
  }

  loadFavoritesPublic(documentModel: DocumentModel): FavoritesDto {
    const publicContent = loadPublicContent(documentModel);
    return {
      images: publicContent.images.map(loadMinimalPublicImage),
    };
  }

  update$(drive: drive_v3.Drive): Observable<void> {
    return from(
      getGoogleDriveFolderWithName$(
        drive,
        this.configProvider.googleDriveWebsitesFolderId,
        'favorites'
      )
    ).pipe(
      concatMap((folder) =>
        from(
          this.entityModel.find({
            type: EntityType.Favorites,
            slug: folder.name,
          })
        ).pipe(
          concatMap((documentModels) => {
            const documentModelsArray = loadDocumentModelsArray(documentModels);
            if (documentModelsArray.length > 0) {
              this.logger.log(`Found entity ${folder.name}`);
              return combineLatest([of(folder), of(documentModelsArray[0])]);
            }

            this.logger.log(`Creating entity ${folder.name}`);
            //TODO: Validate only 1
            return combineLatest([
              of(folder),
              from(
                new this.entityModel({
                  ...loadNewEntity({
                    type: EntityType.Favorites,
                    group: DEFAULT_ENTITY_GROUP,
                    slug: FAVORITES_SLUG,
                    isPosted: true,
                  }),
                }).save()
              ),
            ]);
          }),
          concatMap(([folder, documentModel]) =>
            this.googleDriveWebsitesProvider.sync$(drive, folder, documentModel)
          )
        )
      ),
      mapTo(undefined)
    );
  }
}
