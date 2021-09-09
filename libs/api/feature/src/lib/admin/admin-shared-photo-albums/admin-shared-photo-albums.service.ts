import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { v4 as uuidv4 } from 'uuid';
import { concatMapTo, from, mapTo, Observable, of } from 'rxjs';

import { GoogleDriveFolder } from '@dark-rush-photography/api/types';
import {
  getGoogleDrive,
  getGoogleDriveFolderParents$,
  watchFolder$,
} from '@dark-rush-photography/api/util';
import { GoogleDriveChannelTable } from '@dark-rush-photography/shared-server/data';
import {
  ConfigProvider,
  SharedPhotoAlbumProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminSharedPhotoAlbumsService {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectRepository(GoogleDriveChannelTable)
    private readonly googleDriveChannelRepository: Repository<GoogleDriveChannelTable>,
    private readonly sharedPhotoAlbumProvider: SharedPhotoAlbumProvider
  ) {
    this.logger = new Logger(AdminSharedPhotoAlbumsService.name);
  }

  watch$(photoAlbumFolderId: string): Observable<boolean> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );

    const channelId = uuidv4();
    const channelToken = uuidv4();

    const channel = new GoogleDriveChannelTable();
    channel.key = channelId;
    channel.token = channelToken;

    return from(
      this.googleDriveChannelRepository.create(channel, channelId)
    ).pipe(mapTo(true));

    /*.pipe(
      concatMapTo(
        watchFolder$(
          googleDrive,
          channelId,
          channelToken,
          photoAlbumFolderId,
          this.configProvider.googleDrivePushNotificationAddress
        )
      )
    );*/
  }

  publish$(photoAlbumFolderId: string): Observable<boolean> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );

    getGoogleDriveFolderParents$(googleDrive, photoAlbumFolderId);
    // Dark Rush
    // Lightroom Export
    // Shared
    // Watermarked or Unwatermaked
    // Shared With Folder
    // Photo Album

    return of(true);
  }

  findOne$(photoAlbumFolderId: string): Observable<GoogleDriveFolder> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );
    return this.sharedPhotoAlbumProvider.findPhotoAlbumFolder$(
      googleDrive,
      photoAlbumFolderId
    );
  }
}
