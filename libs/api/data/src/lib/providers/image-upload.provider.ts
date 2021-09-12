/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import { BlobUploadCommonResponse } from '@azure/storage-blob';

import { Observable } from 'rxjs';

import {
  ImageDimensionType,
  MediaState,
} from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  downloadBlobToFile$,
  getAzureStorageBlobPath,
  uploadBufferToBlob$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';
import { ImageProvider } from './image.provider';
import { ImageDimensionProvider } from './image-dimension.provider';

@Injectable()
export class ImageUploadProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider
  ) {
    this.logger = new Logger(ImageUploadProvider.name);
  }

  upload$(
    state: MediaState,
    blobPathId: string,
    fileName: string,
    file: Express.Multer.File
  ): Observable<BlobUploadCommonResponse> {
    return uploadBufferToBlob$(
      this.configProvider.getAzureStorageConnectionString(state),
      this.configProvider.getAzureStorageBlobContainerName(state),
      file.buffer,
      getAzureStorageBlobPath(blobPathId, fileName)
    );
  }

  /*
  process$(
    media: Media,
    isThreeSixty: boolean,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    const tileResolution = isThreeSixty
      ? this.configProvider.findThreeSixtyImageResolution(
          ImageDimensionType.ThreeSixtyTile
        )
      : this.configProvider.findImageResolution(ImageDimensionType.Tile);
    const smallResolution = isThreeSixty
      ? this.configProvider.findThreeSixtyImageResolution(
          ImageDimensionType.ThreeSixtySmall
        )
      : this.configProvider.findImageResolution(ImageDimensionType.Small);

    return this.updateDateCreated$(media, entityModel).pipe(
   //   concatMap(this.tinifyImage$(media)),
   //   concatMap(
   //     this.imageDimensionProvider.resize$(media, tileResolution, entityModel)
   //   ),
   //   concatMap(
   //     this.imageDimensionProvider.resize$(media, smallResolution, entityModel)
   //   ),
      tap(() => this.logger.log(`Publishing ${media.fileName} complete`))
    );
  }
*/
}
