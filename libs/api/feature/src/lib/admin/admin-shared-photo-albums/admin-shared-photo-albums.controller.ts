import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { GoogleDriveFolderDto } from '@dark-rush-photography/shared/types';
import { GoogleDriveFolder } from '@dark-rush-photography/api/types';
import { AdminSharedPhotoAlbumsService } from './admin-shared-photo-albums.service';

@Controller({ path: 'admin/shared-photo-albums', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Shared Photo Albums')
export class AdminSharedPhotoAlbumsController {
  constructor(
    private readonly adminSharedPhotoAlbumsService: AdminSharedPhotoAlbumsService
  ) {}

  @Post('watch/:photoAlbumFolderId')
  @ApiOkResponse({ type: Boolean })
  watch$(
    @Param('photoAlbumFolderId') photoAlbumFolderId: string
  ): Observable<boolean> {
    return this.adminSharedPhotoAlbumsService.watch$(photoAlbumFolderId);
  }

  @Post('publish/:photoAlbumFolderId')
  @ApiOkResponse({ type: Boolean })
  publish$(
    @Param('photoAlbumFolderId') photoAlbumFolderId: string
  ): Observable<boolean> {
    return this.adminSharedPhotoAlbumsService.publish$(photoAlbumFolderId);
  }

  @Get(':photoAlbumFolderId')
  @ApiOkResponse({ type: [GoogleDriveFolderDto] })
  findOne$(
    @Param('photoAlbumFolderId') photoAlbumFolderId: string
  ): Observable<GoogleDriveFolder> {
    return this.adminSharedPhotoAlbumsService.findOne$(photoAlbumFolderId);
  }
}
