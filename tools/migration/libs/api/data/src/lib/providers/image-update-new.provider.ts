import { Injectable } from '@nestjs/common';

import { concatMap, from, last, Observable, of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { getGoogleDriveImageFiles$ } from '@dark-rush-photography/api/util';
import { ImageRemoveAllProvider } from './image-remove-all.provider';
import { ImageFindFolderProvider } from './image-find-folder.provider';
import { ImageAddProvider } from './image-add.provider';
import { ImageProcessOneProvider } from './image-process-one.provider';

@Injectable()
export class ImageUpdateNewProvider {
  constructor(
    private readonly imageRemoveAllProvider: ImageRemoveAllProvider,
    private readonly imageFindFolderProvider: ImageFindFolderProvider,
    private readonly imageAddProvider: ImageAddProvider,
    private readonly imageProcessOneProvider: ImageProcessOneProvider
  ) {}

  updateNewImages$(
    googleDrive: drive_v3.Drive,
    entityId: string
  ): Observable<void> {
    return this.imageRemoveAllProvider.removeAllNewImages$(entityId).pipe(
      concatMap(() =>
        this.imageFindFolderProvider.findNewImagesFolder$(googleDrive, entityId)
      ),
      concatMap((newImagesFolder) => {
        if (!newImagesFolder) return of(undefined);

        return getGoogleDriveImageFiles$(googleDrive, newImagesFolder.id).pipe(
          concatMap((newImageFiles) => {
            if (newImageFiles.length === 0) return of(undefined);

            return from(newImageFiles).pipe(
              concatMap((newImageFile) =>
                this.imageAddProvider.addNewImage$(
                  googleDrive,
                  newImageFile,
                  entityId
                )
              ),
              concatMap((newImage) => {
                if (!newImage) return of(undefined);

                return this.imageProcessOneProvider.processNewImage$(newImage);
              }),
              last()
            );
          })
        );
      })
    );
  }
}
