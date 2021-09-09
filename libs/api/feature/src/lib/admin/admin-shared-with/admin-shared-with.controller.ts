import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { GoogleDriveFolderDto } from '@dark-rush-photography/shared/types';
import { GoogleDriveFolder } from '@dark-rush-photography/api/types';
import { AdminSharedWithService } from './admin-shared-with.service';

@Controller({ path: 'admin/shared-with', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Shared With')
export class AdminSharedWithController {
  constructor(
    private readonly adminSharedWithService: AdminSharedWithService
  ) {}

  @Get()
  @ApiOkResponse({ type: [GoogleDriveFolderDto] })
  findAll$(): Observable<GoogleDriveFolder[]> {
    return this.adminSharedWithService.findAll$();
  }

  @Get(':sharedWithFolderId')
  @ApiOkResponse({ type: [GoogleDriveFolderDto] })
  findPhotoAlbumFolders$(
    @Param('sharedWithFolderId') sharedWithFolderId: string
  ): Observable<GoogleDriveFolder[]> {
    return this.adminSharedWithService.findOne$(sharedWithFolderId);
  }
}
