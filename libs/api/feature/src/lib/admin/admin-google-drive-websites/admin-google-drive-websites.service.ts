import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { google } from 'googleapis';

import { EntityType } from '@dark-rush-photography/shared/types';
import {
  AboutProvider,
  BestOfProvider,
  ConfigProvider,
  DestinationProvider,
  EventProvider,
  FavoritesProvider,
  PhotoOfTheWeekProvider,
  ReviewMediaProvider,
  ReviewProvider,
  SocialMediaProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminGoogleDriveWebsitesService {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly aboutProvider: AboutProvider,
    private readonly bestOfProvider: BestOfProvider,
    private readonly destinationProvider: DestinationProvider,
    private readonly eventProvider: EventProvider,
    private readonly favoritesProvider: FavoritesProvider,
    private readonly photoOfTheWeekProvider: PhotoOfTheWeekProvider,
    private readonly reviewMediaProvider: ReviewMediaProvider,
    private readonly reviewProvider: ReviewProvider,
    private readonly socialMediaProvider: SocialMediaProvider
  ) {
    this.logger = new Logger(AdminGoogleDriveWebsitesService.name);
  }

  findFolders$(entityType: EntityType): Observable<string[]> {
    const scopes = ['https://www.googleapis.com/auth/drive'];
    const auth = new google.auth.JWT(
      this.configProvider.googleDriveClientEmail,
      undefined,
      this.configProvider.googleDrivePrivateKey.replace(/\\n/gm, '\n'),
      scopes
    );

    const drive = google.drive({ version: 'v3', auth });
    switch (entityType) {
      case EntityType.About:
        return this.aboutProvider.findFolders$(drive);
      case EntityType.BestOf:
        return this.bestOfProvider.findFolders$(drive);
      default:
        throw new BadRequestException('Invalid entity type');
    }
  }

  sync$(entityType: EntityType, folderName: string): Observable<void> {
    const scopes = ['https://www.googleapis.com/auth/drive'];
    const auth = new google.auth.JWT(
      this.configProvider.googleDriveClientEmail,
      undefined,
      this.configProvider.googleDrivePrivateKey.replace(/\\n/gm, '\n'),
      scopes
    );

    const drive = google.drive({ version: 'v3', auth });
    switch (entityType) {
      case EntityType.About:
        return this.aboutProvider.sync$(drive, folderName);
      case EntityType.BestOf:
        return this.bestOfProvider.sync$(drive, folderName);
      default:
        throw new BadRequestException('Invalid entity type');
    }
  }
}
