import * as fs from 'fs-extra';
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

import {
  GoogleDriveFolder,
  ImageDimensionType,
  Media,
  MediaState,
} from '@dark-rush-photography/shared/types';
import {
  downloadGoogleDriveImageFile,
  findImageResolution,
  findImageResolution$,
  getAzureStorageBlobPath,
  getGoogleDriveImageFiles$,
  getOrderFromGoogleDriveImageFileName,
  uploadStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { loadMedia } from '../content/media.functions';
import { ImageDimensionProvider } from './image-dimension.provider';
import { ImageResizeProvider } from './image-resize.provider';
import { ImageRemoveProvider } from './image-remove.provider';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageLoadNewProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageDimensionProvider: ImageDimensionProvider,
    private readonly imageResizeProvider: ImageResizeProvider,
    private readonly imageRemoveProvider: ImageRemoveProvider
  ) {
    this.logger = new Logger(ImageLoadNewProvider.name);
  }

  loadNewImages$(
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
        const order = getOrderFromGoogleDriveImageFileName(
          googleDriveImageFile.name
        );
        const image = {
          id,
          entityId,
          state: MediaState.New,
          blobPathId: uuidv4(),
          fileName: googleDriveImageFile.name,
          order,
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
        this.loadNewImage(
          googleDrive,
          processImage.imageFileId,
          processImage.media
        )
      )
    );
  }

  loadNewImage(
    googleDrive: drive_v3.Drive,
    imageFileId: string,
    media: Media
  ): Observable<void> {
    const smallResolution = findImageResolution(ImageDimensionType.Small);
    const id = uuidv4();
    return from(downloadGoogleDriveImageFile(googleDrive, imageFileId)).pipe(
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.getAzureStorageConnectionString(media.state),
          this.configProvider.getAzureStorageBlobContainerName(media.state),
          fs.createReadStream(filePath),
          getAzureStorageBlobPath(media.blobPathId, media.fileName)
        )
      ),
      concatMap(() => this.imageResizeProvider.resize$(media, smallResolution)),
      concatMap(([filePath]) => findImageResolution$(filePath)),
      concatMap((resolution) =>
        this.imageDimensionProvider.add$(
          id,
          media.id,
          media.entityId,
          smallResolution.type,
          resolution
        )
      ),
      map(() => undefined)
    );
  }
}
