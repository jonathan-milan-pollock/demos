import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, concatMapTo, from, mapTo, Observable } from 'rxjs';

import { ImageDimensionType } from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/shared-server/types';
import { SyncedImageTable } from '@dark-rush-photography/shared-server/data';
import { ConfigProvider } from './config.provider';
import { TinifyImageProvider } from './tinify-image.provider';
import { ResizeImageProvider } from './resize-image.provider';

@Injectable()
export class ProcessSyncImageProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectRepository(SyncedImageTable)
    private readonly syncedImageTable: Repository<SyncedImageTable>,
    private readonly tinifyImageProvider: TinifyImageProvider,
    private readonly resizeImageProvider: ResizeImageProvider
  ) {
    this.logger = new Logger(ProcessSyncImageProvider.name);
  }

  processSyncImage$(media: Media): Observable<void> {
    const tileResolution = this.configProvider.findImageResolution(
      ImageDimensionType.Tile
    );
    const smallResolution = this.configProvider.findImageResolution(
      ImageDimensionType.Small
    );

    return this.tinifyImageProvider.tinifyImage$(media).pipe(
      concatMapTo(this.resizeImageProvider.resizeImage$(media, tileResolution)),
      concatMapTo(
        this.resizeImageProvider.resizeImage$(media, smallResolution)
      ),
      concatMap(() => {
        const key = uuidv4();
        const syncedImageTable = new SyncedImageTable();
        syncedImageTable.key = key;
        syncedImageTable.entityId = media.entityId;
        syncedImageTable.mediaType = media.type;
        syncedImageTable.mediaId = media.id;
        return from(this.syncedImageTable.create(syncedImageTable, key));
      }),
      mapTo(undefined)
    );
  }
}
