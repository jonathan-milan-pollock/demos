import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  ADMIN,
  Image,
  Media,
  MediaType,
} from '@dark-rush-photography/shared-types';
import { MediaDto } from '@dark-rush-photography/api/types';
import {
  MediaTypeValidationPipe,
  Roles,
  RolesGuard,
} from '@dark-rush-photography/api/util';
import { AdminMediaService } from './admin-media.service';

@Controller('admin/v1/media')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Media')
export class AdminMediaController {
  constructor(private readonly adminMediaService: AdminMediaService) {}

  @Roles(ADMIN)
  @Post(':mediaType')
  @ApiParam({
    name: 'mediaType',
    enum: MediaType,
  })
  @ApiCreatedResponse({ type: MediaDto })
  create$(
    @Param('mediaType', new MediaTypeValidationPipe())
    mediaType: MediaType,
    @Param('slug') slug: string
  ): Observable<Media> {
    return this.adminMediaService.create$(mediaType, slug);
  }

  @Roles(ADMIN)
  @Get(':mediaType')
  @ApiParam({
    name: 'mediaType',
    enum: MediaType,
  })
  @ApiOkResponse({ type: [MediaDto] })
  findAll$(
    @Param('mediaType', new MediaTypeValidationPipe())
    mediaType: MediaType
  ): Observable<Media[]> {
    return this.adminMediaService.findAll$(mediaType);
  }

  @Roles(ADMIN)
  @Get(':id')
  @ApiOkResponse({ type: MediaDto })
  findOne$(@Param('id') id: string): Observable<Media> {
    return this.adminMediaService.findOne$(id);
  }

  @Roles(ADMIN)
  @Post(':id/upload-apple-icons')
  @UseInterceptors(FileInterceptor('file'))
  uploadAppleIcon$(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<Image> {
    return this.adminMediaService.uploadAppleIcon$(id, file);
  }

  @Roles(ADMIN)
  @Post(':id/process-apple-icons')
  @ApiOkResponse({ type: MediaDto })
  processAppleIcon$(@Param('id') id: string): Observable<Media> {
    return this.adminMediaService.processAppleIcon$(id);
  }

  @Roles(ADMIN)
  @Post(':id/upload-apple-resources')
  @UseInterceptors(FileInterceptor('file'))
  uploadAppleResource$(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<Image> {
    return this.adminMediaService.uploadAppleResource$(id, file);
  }

  @Roles(ADMIN)
  @Post(':id/process-apple-resources')
  @ApiOkResponse({ type: MediaDto })
  processAppleResource$(@Param('id') id: string): Observable<Media> {
    return this.adminMediaService.processAppleResource$(id);
  }

  @Roles(ADMIN)
  @Post(':id/upload-image-video')
  @UseInterceptors(FileInterceptor('file'))
  uploadImageVideo$(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<Image> {
    return this.adminMediaService.uploadImageVideo$(id, file);
  }

  @Roles(ADMIN)
  @Post(':id/process-image-video')
  @ApiOkResponse({ type: MediaDto })
  processImageVideo$(@Param('id') id: string): Observable<Media> {
    return this.adminMediaService.processImageVideo$(id);
  }

  @Roles(ADMIN)
  @Post(':id/upload-mobile-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadMobileImage$(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<Image> {
    return this.adminMediaService.uploadMobileImage$(id, file);
  }

  @Roles(ADMIN)
  @Post(':id/process-mobile-image')
  @ApiOkResponse({ type: MediaDto })
  processMobileImage$(@Param('id') id: string): Observable<Media> {
    return this.adminMediaService.processMobileImage$(id);
  }

  @Roles(ADMIN)
  @Post(':id/upload-png')
  @UseInterceptors(FileInterceptor('file'))
  uploadPng$(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<Image> {
    return this.adminMediaService.uploadPng$(id, file);
  }

  @Roles(ADMIN)
  @Put(':id/process-png')
  processPng$(@Param('id') id: string): Observable<Media> {
    return this.adminMediaService.processPng$(id);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminMediaService.delete$(id);
  }
}
