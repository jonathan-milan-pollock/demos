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
import { ImageAddNewProvider } from './image-add-new.provider';

@Injectable()
export class ImageLoadNewProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly imageFolderProvider: ImageFolderProvider,
    private readonly imageAddNewProvider: ImageAddNewProvider,
    private readonly contentRemoveProvider: ContentRemoveProvider
  ) {
    this.logger = new Logger(ImageLoadNewProvider.name);
  }

  loadNewImages$(entityId: string): Observable<undefined> {
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
                  this.imageAddNewProvider.addNewImage$(
                    googleDrive,
                    newImageFile,
                    entityId
                  )
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
