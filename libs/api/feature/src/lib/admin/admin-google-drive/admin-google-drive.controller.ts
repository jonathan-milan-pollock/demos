import { Controller, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { AdminGoogleDriveService } from './admin-google-drive.service';

@Controller({ path: 'admin/google-drive', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Google Drive')
export class AdminGoogleDriveController {
  constructor(
    private readonly adminGoogleDriveService: AdminGoogleDriveService
  ) {}

  @Post('sync')
  sync(): Observable<void> {
    return this.adminGoogleDriveService.sync$();
  }
}
