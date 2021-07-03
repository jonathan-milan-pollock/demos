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

import { ADMIN, Image } from '@dark-rush-photography/shared/types';
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
    @Body() imageAdd: ImageAddDto
  ): Observable<Image> {
    return this.adminImagesService.add$(entityId, imageAdd);
  }

  @Roles(ADMIN)
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @HttpCode(204)
  upload$(
    @Query('entityId') entityId: string,
    @UploadedFile() image: Express.Multer.File
  ): Observable<void> {
    return this.adminImagesService.uploadImage$(entityId, image);
  }

  @Roles(ADMIN)
  @Post('upload-three-sixty-image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @HttpCode(204)
  uploadThreeSixtyImage$(
    @Query('entityId') entityId: string,
    @UploadedFile() threeSixtyImage: Express.Multer.File
  ): Observable<void> {
    return this.adminImagesService.uploadThreeSixtyImage$(
      entityId,
      threeSixtyImage
    );
  }

  @Roles(ADMIN)
  @Post(':id/update')
  @HttpCode(204)
  updateProcess$(
    @Param('id') id: string,
    @Query('entityId') entityId: string,
    @Body() imageUpdate: ImageUpdateDto
  ): Observable<void> {
    return this.adminImagesService.updateProcess$(id, entityId, imageUpdate);
  }

  @Roles(ADMIN)
  @Put(':id')
  @ApiOkResponse({ type: ImageDto })
  update$(
    @Param('id') id: string,
    @Query('entityId') entityId: string,
    @Body() imageUpdate: ImageUpdateDto
  ): Observable<Image> {
    return this.adminImagesService.update$(id, entityId, imageUpdate);
  }

  @Roles(ADMIN)
  @Post(':id/post')
  @HttpCode(204)
  postProcess$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.adminImagesService.postProcess$(id, entityId);
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
  @Post(':id/remove')
  @HttpCode(204)
  removeProcess$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.adminImagesService.removeProcess$(id, entityId);
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
