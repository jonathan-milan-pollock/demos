import {
  Controller,
  Body,
  Param,
  Put,
  UseGuards,
  Post,
  HttpCode,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, Image } from '@dark-rush-photography/shared-types';
import {
  FileUploadDto,
  ImageAddDto,
  ImageDto,
  ImageUpdateDto,
} from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminImagesService } from './admin-images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin/v1/images')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Images')
export class AdminImagesController {
  constructor(private readonly adminImagesService: AdminImagesService) {}

  @Roles(ADMIN)
  @Post()
  @ApiOkResponse({ type: ImageDto })
  add$(
    @Query('entityId') entityId: string,
    @Body() image: ImageAddDto
  ): Observable<Image> {
    return this.adminImagesService.add$(entityId, image);
  }

  @Roles(ADMIN)
  @Put(':imageId')
  @ApiOkResponse({ type: ImageDto })
  update$(
    @Param('imageId') imageId: string,
    @Query('entityId') entityId: string,
    @Body() image: ImageUpdateDto
  ): Observable<Image> {
    return this.adminImagesService.update$(entityId, imageId, image);
  }

  @Roles(ADMIN)
  @Post('upload-review')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  upload$(
    @Query('reviewId') reviewId: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<Image> {
    return this.adminImagesService.uploadReview$(reviewId, file);
  }

  @Roles(ADMIN)
  @Post('upload-three-sixty')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  uploadThreeSixty$(
    @Query('entityId') entityId: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<Image> {
    return this.adminImagesService.uploadThreeSixty$(entityId, file);
  }

  @Roles(ADMIN)
  @Post('upload-media-png')
  @UseInterceptors(FileInterceptor('file'))
  uploadPng$(
    @Query('mediaId') mediaId: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<Image> {
    return this.adminImagesService.uploadMediaPng$(mediaId, file);
  }

  @Roles(ADMIN)
  @Post('upload-media-apple-icon')
  @UseInterceptors(FileInterceptor('file'))
  uploadAppleIcon$(
    @Query('mediaId') mediaId: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<Image> {
    return this.adminImagesService.uploadMediaAppleIcon$(mediaId, file);
  }

  @Roles(ADMIN)
  @Post('upload-media-apple-resource')
  @UseInterceptors(FileInterceptor('file'))
  uploadAppleResource$(
    @Query('mediaId') mediaId: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<Image> {
    return this.adminImagesService.uploadMediaAppleResource$(mediaId, file);
  }

  @Roles(ADMIN)
  @Delete(':imageId')
  @HttpCode(204)
  remove$(
    @Param('imageId') imageId: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.adminImagesService.remove$(entityId, imageId);
  }
}
