import {
  Controller,
  Body,
  Param,
  Put,
  UseGuards,
  Post,
  HttpCode,
  Headers,
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
  ImageDto,
  ImageUpdateDto,
  ThreeSixtyImageSettingsDto,
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
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiOkResponse({ type: ImageDto })
  upload$(
    @Headers('X-FILE-NAME') fileName: string,
    @Query('entityId') entityId: string,
    @UploadedFile() image: Express.Multer.File
  ): Observable<Image> {
    const isThreeSixtyImage = false;
    return this.adminImagesService.upload$(
      entityId,
      fileName,
      isThreeSixtyImage,
      image
    );
  }

  @Roles(ADMIN)
  @Post('upload-three-sixty-image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiOkResponse({ type: ImageDto })
  uploadThreeSixtyImage$(
    @Headers('X-FILE-NAME') fileName: string,
    @Query('entityId') entityId: string,
    @UploadedFile() threeSixtyImage: Express.Multer.File
  ): Observable<Image> {
    const isThreeSixtyImage = true;
    return this.adminImagesService.upload$(
      entityId,
      fileName,
      isThreeSixtyImage,
      threeSixtyImage
    );
  }

  @Roles(ADMIN)
  @Post('upload-lightroom-image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiOkResponse({ type: ImageDto })
  uploadLightroomImage$(
    @Headers('X-LIGHTROOM-PATH') lightroomPath: string,
    @UploadedFile() lightroomImage: Express.Multer.File
  ): Observable<Image> {
    return this.adminImagesService.uploadLightroomImage$(
      lightroomPath,
      lightroomImage
    );
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
  @Put(':id/:imageDimensionType/three-sixty-image-settings')
  @HttpCode(204)
  updateThreeSixtyImageSettings$(
    @Param('id') id: string,
    @Query('entityId') entityId: string,
    @Body() threeSixtyImageSettings: ThreeSixtyImageSettingsDto
  ): Observable<void> {
    return this.adminImagesService.updateThreeSixtyImageSettings$(
      id,
      entityId,
      threeSixtyImageSettings
    );
  }

  @Roles(ADMIN)
  @Put(':id/processing/:isProcessing')
  @ApiOkResponse({ type: ImageDto })
  setIsProcessing$(
    @Param('id') id: string,
    @Param('isProcessing') isProcessing: boolean,
    @Query('entityId') entityId: string
  ): Observable<Image> {
    return this.adminImagesService.setIsProcessing$(id, entityId, isProcessing);
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
  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.adminImagesService.remove$(id, entityId);
  }
}
