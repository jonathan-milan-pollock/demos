import { Injectable, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { google } from 'googleapis';

import { AboutProvider, ConfigProvider } from '@dark-rush-photography/api/data';

@Injectable()
export class AdminGoogleDriveService {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly aboutProvider: AboutProvider
  ) {
    this.logger = new Logger(AdminGoogleDriveService.name);
  }

  sync$(): Observable<void> {
    const scopes = ['https://www.googleapis.com/auth/drive'];
    const auth = new google.auth.JWT(
      this.configProvider.googleDriveClientEmail,
      undefined,
      this.configProvider.googleDrivePrivateKey.replace(/\\n/gm, '\n'),
      scopes
    );

    const drive = google.drive({ version: 'v3', auth });
    return this.aboutProvider.sync$(drive, 'dark-rush');
  }
}
