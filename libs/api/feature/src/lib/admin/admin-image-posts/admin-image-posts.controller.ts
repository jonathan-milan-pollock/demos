import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Query,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Image } from '@dark-rush-photography/shared/types';
import {
  EntityAdminDto,
  FileUploadDto,
  ImageAdminDto,
  ImagePostCreateDto,
} from '@dark-rush-photography/api/types';
import {
  AdminAuthGuard,
  AdminRole,
  ParseObjectIdPipe,
} from '@dark-rush-photography/api/util';
import { AdminImagePostsService } from './admin-image-posts.service';

@Controller({ path: 'admin/image-posts', version: '1' })
@UseGuards(AdminAuthGuard)
@ApiBearerAuth()
@ApiTags('Admin Image Posts')
export class AdminImagePostsController {
  constructor(
    private readonly adminImagePostsService: AdminImagePostsService
  ) {}

  @AdminRole()
  @Post()
  @ApiCreatedResponse({ type: EntityAdminDto })
  create$(
    @Body() imagePostCreate: ImagePostCreateDto
  ): Observable<EntityAdminDto> {
    return this.adminImagePostsService.create$(imagePostCreate);
  }

  @AdminRole()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiOkResponse({ type: ImageAdminDto })
  upload$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @UploadedFile() image: Express.Multer.File
  ): Observable<Image> {
    return this.adminImagePostsService.upload$(
      entityId,
      image.originalname,
      false,
      image
    );
  }
}
