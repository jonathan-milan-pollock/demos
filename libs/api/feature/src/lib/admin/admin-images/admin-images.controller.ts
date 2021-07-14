import {
  Controller,
  Body,
  Param,
  Put,
  Post,
  HttpCode,
  Headers,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Get,
  ParseUUIDPipe,
  ParseBoolPipe,
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

import { Image, ImageDimensionType } from '@dark-rush-photography/shared/types';
import {
  FileUploadDto,
  ImageDto,
  ImageUpdateDto,
  ThreeSixtyImageSettingsDto,
} from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminImagesService } from './admin-images.service';

@Controller({ path: 'admin/images', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Images')
export class AdminImagesController {
  constructor(private readonly adminImagesService: AdminImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiOkResponse({ type: ImageDto })
  upload$(
    @Headers('X-FILE-NAME') fileName: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string,
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

  @Post('upload-three-sixty-image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiOkResponse({ type: ImageDto })
  uploadThreeSixtyImage$(
    @Headers('X-FILE-NAME') fileName: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string,
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

  @Put(':id')
  @ApiOkResponse({ type: ImageDto })
  update$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId') entityId: string,
    @Body() imageUpdate: ImageUpdateDto
  ): Observable<Image> {
    return this.adminImagesService.update$(id, entityId, imageUpdate);
  }

  @Put(':id/:imageDimensionType/three-sixty-image-settings')
  @HttpCode(204)
  updateThreeSixtyImageSettings$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId') entityId: string,
    @Body() threeSixtyImageSettings: ThreeSixtyImageSettingsDto
  ): Observable<void> {
    return this.adminImagesService.updateThreeSixtyImageSettings$(
      id,
      entityId,
      ImageDimensionType.Facebook, //TODO: add parameter
      threeSixtyImageSettings
    );
  }

  @Put(':id/processing/:isProcessing')
  @ApiOkResponse({ type: ImageDto })
  setIsProcessing$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('isProcessing', ParseBoolPipe) isProcessing: boolean,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<Image> {
    return this.adminImagesService.setIsProcessing$(id, entityId, isProcessing);
  }

  @Get(':id')
  @ApiOkResponse({ type: ImageDto })
  findOne$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId') entityId: string
  ): Observable<Image> {
    return this.adminImagesService.findOne$(id, entityId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.adminImagesService.remove$(id, entityId);
  }
}
