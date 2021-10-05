import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  Body,
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

import {
  EntityMinimalAdminDto,
  FileUploadDto,
  ImageAdminDto,
  ImagePostCreateDto,
} from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminImagePostsService } from './admin-image-posts.service';

@Controller({ path: 'admin/image-posts', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Image Posts')
export class AdminImagePostsController {
  constructor(
    private readonly adminImagePostsService: AdminImagePostsService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: EntityMinimalAdminDto })
  create$(
    @Body() imagePostCreate: ImagePostCreateDto
  ): Observable<EntityMinimalAdminDto> {
    return this.adminImagePostsService.create$(imagePostCreate);
  }

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
  ): Observable<ImageAdminDto> {
    return this.adminImagePostsService.upload$(
      entityId,
      image.originalname,
      image
    );
  }
}
