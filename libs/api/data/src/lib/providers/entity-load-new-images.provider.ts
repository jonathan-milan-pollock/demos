import { Injectable, Logger } from '@nestjs/common';

import { concatMap, from, last, map, Observable, of } from 'rxjs';

import { ImageState } from '@dark-rush-photography/shared/types';
import {
  getGoogleDrive,
  getGoogleDriveImageFiles$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';
import { ImageFolderProvider } from './image-folder.provider';
import { ContentRemoveProvider } from './content-remove.provider';
import { ImageAddProvider } from './image-add.provider';
import { ImageProcessProvider } from './image-process.provider';

@Injectable()
export class EntityLoadNewImagesProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly imageFolderProvider: ImageFolderProvider,
    private readonly imageAddProvider: ImageAddProvider,
    private readonly imageProcessProvider: ImageProcessProvider,
    private readonly contentRemoveProvider: ContentRemoveProvider
  ) {
    this.logger = new Logger(EntityLoadNewImagesProvider.name);
  }

  loadNewImages$(entityId: string): Observable<void> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );

    return this.contentRemoveProvider
      .removeAllImagesForState$(ImageState.New, entityId)
      .pipe(
        concatMap(() =>
          this.imageFolderProvider.findNewImagesFolder$(googleDrive, entityId)
        ),
        concatMap((newImagesFolder) => {
          if (!newImagesFolder) return of(undefined);

          return getGoogleDriveImageFiles$(
            googleDrive,
            newImagesFolder.id
          ).pipe(
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
                concatMap((image) =>
                  this.imageProcessProvider.processNewImage$(image)
                ),
                last(),
                map(() => undefined)
              );
            })
          );
        })
      );
  }
}
