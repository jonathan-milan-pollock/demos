import * as path from 'path';
import { Injectable, Logger } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import {
  combineLatest,
  concatMap,
  from,
  last,
  map,
  Observable,
  of,
  toArray,
} from 'rxjs';
import { drive_v3 } from 'googleapis';

import { MediaType } from '@dark-rush-photography/shared/types';
import { GoogleDriveFolder, Media } from '@dark-rush-photography/api/types';
import { getGoogleDriveImageFiles$ } from '@dark-rush-photography/api/util';
import { DocumentModel } from '../schema/document.schema';
import { ImageProvider } from './image.provider';
import { ImageRemoveProvider } from './image-remove.provider';
import { ImageProcessProvider } from './image-process.provider';

@Injectable()
export class ImagesProcessProvider {
  private readonly logger: Logger;

  constructor(
    private readonly imageProvider: ImageProvider,
    private readonly imageRemoveProvider: ImageRemoveProvider,
    private readonly imageProcessProvider: ImageProcessProvider
  ) {
    this.logger = new Logger(ImagesProcessProvider.name);
  }

  processNewImages$(
    googleDrive: drive_v3.Drive,
    documentModel: DocumentModel,
    entityImagesFolder: GoogleDriveFolder
  ): Observable<void> {
    return of(documentModel).pipe(
      concatMap(() => this.imageRemoveProvider.removeNewImages$(documentModel)),
      last(),
      concatMap(() =>
        getGoogleDriveImageFiles$(googleDrive, entityImagesFolder.id)
      ),
      concatMap((googleDriveImageFiles) => from(googleDriveImageFiles)),
      concatMap((googleDriveImageFile) => {
        const id = uuidv4();
        const fileName = googleDriveImageFile.name;
        const orderFileName = fileName.substring(fileName.lastIndexOf('-'));
        const parsedFileName = path.parse(orderFileName);

        return combineLatest([
          of(googleDriveImageFile.id),
          this.imageProvider.add$(
            id,
            documentModel._id,
            `${id}${parsedFileName.ext}`,
            +parsedFileName.name,
            false,
            true
          ),
        ]);
      }),
      map(([imageFileId, image]) => ({
        imageFileId,
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
      toArray<{ imageFileId: string; media: Media }>(),
      concatMap((processImages) => from(processImages)),
      concatMap((processImage) =>
        this.imageProcessProvider.processNewImage$(
          googleDrive,
          processImage.imageFileId,
          processImage.media
        )
      )
    );
  }
}
