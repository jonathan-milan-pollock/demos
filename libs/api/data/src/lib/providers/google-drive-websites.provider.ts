import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { v4 as uuidv4 } from 'uuid';
import {
  combineLatest,
  concatMap,
  concatMapTo,
  from,
  last,
  map,
  Observable,
  of,
  toArray,
} from 'rxjs';
import { drive_v3 } from 'googleapis';

import { MediaType } from '@dark-rush-photography/shared/types';
import {
  GoogleDriveFolder,
  SyncImage,
} from '@dark-rush-photography/shared-server/types';
import { getGoogleDriveImages$ } from '@dark-rush-photography/shared-server/util';
import { DocumentModel } from '../schema/document.schema';
import { ImageProvider } from './image.provider';
import { ImageRemoveProvider } from './image-remove.provider';

@Injectable()
export class GoogleDriveWebsitesProvider {
  private readonly logger: Logger;

  constructor(
    private readonly httpService: HttpService,
    private readonly imageProvider: ImageProvider,
    private readonly imageRemoveProvider: ImageRemoveProvider
  ) {
    this.logger = new Logger(GoogleDriveWebsitesProvider.name);
  }

  sync$(
    drive: drive_v3.Drive,
    folder: GoogleDriveFolder,
    documentModel: DocumentModel
  ): Observable<void> {
    return of(documentModel).pipe(
      concatMap(() => this.imageRemoveProvider.removeNewImages$(documentModel)),
      last(),
      concatMapTo(getGoogleDriveImages$(drive, folder.id)),
      concatMap((googleDriveImages) => from(googleDriveImages)),
      concatMap((googleDriveImage) => {
        this.logger.log(`Adding data image ${googleDriveImage.name}`);
        const id = uuidv4();
        return combineLatest([
          of(googleDriveImage.id),
          this.imageProvider.add$(
            id,
            documentModel._id,
            googleDriveImage.name,
            false,
            true
          ),
        ]);
      }),
      map(([googleDriveImageId, image]) => ({
        googleDriveImageId,
        media: {
          type: MediaType.Image,
          id: image.id,
          fileName: image.fileName,
          state: image.state,
          entityType: documentModel.type,
          entityId: documentModel._id,
          entityGroup: documentModel.group,
          entitySlug: documentModel.slug,
        },
      })),
      toArray<SyncImage>(),
      concatMap((syncImages) =>
        this.httpService.post(
          'http://localhost:3333/api/sync-images',
          syncImages,
          {
            //TODO: Add function key
          }
        )
      ),
      map((response) => {
        if (response.status !== 202)
          throw new BadRequestException('Unable to sync images');
      })
    );
  }
}