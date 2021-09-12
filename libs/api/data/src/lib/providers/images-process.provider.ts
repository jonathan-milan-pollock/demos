import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

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
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import { MediaState } from '@dark-rush-photography/shared/types';
import { GoogleDriveFolder, Media } from '@dark-rush-photography/shared/types';
import {
  getGoogleDriveImageFiles$,
  getOrderFromGoogleDriveImageFileName,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { ImageRemoveProvider } from './image-remove.provider';
import { ImageProcessProvider } from './image-process.provider';
import { loadMedia } from '../content/media.functions';

@Injectable()
export class ImagesProcessProvider {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
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
    const entityId = documentModel._id;
    return of(documentModel).pipe(
      concatMap(() =>
        this.imageRemoveProvider.removeImages$(MediaState.New, documentModel)
      ),
      last(),
      concatMap(() =>
        getGoogleDriveImageFiles$(googleDrive, entityImagesFolder.id)
      ),
      concatMap((googleDriveImageFiles) => from(googleDriveImageFiles)),
      concatMap((googleDriveImageFile) => {
        const id = uuidv4();
        const parsedPath = getOrderFromGoogleDriveImageFileName(
          googleDriveImageFile.name
        );
        const image = {
          id,
          entityId,
          state: MediaState.New,
          blobPathId: uuidv4(),
          fileName: `${id}${parsedPath.ext}`,
          order: +parsedPath.name,
          isStarred: false,
          isLoved: false,
          skipExif: false,
          isThreeSixty: false,
        };
        return combineLatest([
          of(googleDriveImageFile.id),
          of(
            loadMedia(
              image.id,
              entityId,
              image.state,
              image.blobPathId,
              image.fileName
            )
          ),
          from(
            this.entityModel.findByIdAndUpdate(entityId, {
              images: [...documentModel.images, { ...image }],
            })
          ),
        ]);
      }),
      map(([imageFileId, media]) => {
        return {
          imageFileId: imageFileId,
          media: media,
        };
      }),
      toArray<{ imageFileId: string; media: Media }>(),
      concatMap((processImages) => from(processImages)),
      concatMap((processImage) =>
        this.imageProcessProvider.processNewImage(
          googleDrive,
          processImage.imageFileId,
          processImage.media
        )
      )
    );
  }
}
