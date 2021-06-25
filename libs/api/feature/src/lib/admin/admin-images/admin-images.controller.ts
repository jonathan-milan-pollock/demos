import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
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
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @Put(':id')
  @ApiOkResponse({ type: ImageDto })
  update$(
    @Param('id') id: string,
    @Query('entityId') entityId: string,
    @Body() image: ImageUpdateDto
  ): Observable<Image> {
    return this.adminImagesService.update$(id, entityId, image);
  }

  @Roles(ADMIN)
  @Get(':id')
  @ApiOkResponse({ type: ImageDto })
  findOne$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<Image> {
    return this.adminImagesService.findOne$(id, entityId);
  }

  @Roles(ADMIN)
  @Post('upload-three-sixty')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  uploadThreeSixtyImage$(
    @Query('entityId') entityId: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<Image> {
    return this.adminImagesService.uploadThreeSixtyImage$(entityId, file);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.adminImagesService.remove$(id, entityId);
  }
}
