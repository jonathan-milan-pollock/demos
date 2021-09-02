import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Public } from '@dark-rush-photography/shared-server/util';
import { GoogleDriveService } from './google-drive.service';

@Controller({ path: 'google-drive', version: '1' })
@Public()
@ApiTags('Public Google Drive')
export class GoogleDriveController {
  constructor(private readonly googleDriveService: GoogleDriveService) {}

  @Get('sitemap')
  @ApiOkResponse({ type: String })
  findSitemap$(): Observable<string> {
    return this.googleDriveService.findSitemap$();
  }
}
