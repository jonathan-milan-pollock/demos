import {
  Controller,
  Body,
  Param,
  Put,
  Post,
  HttpCode,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Get,
  ParseUUIDPipe,
  ParseBoolPipe,
  ParseEnumPipe,
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

import {
  Image,
  ImageAdminDto,
  ImageDimensionType,
  ImageUpdateDto,
  ThreeSixtySettingsDto,
} from '@dark-rush-photography/shared/types';
import { FileUploadDto } from '@dark-rush-photography/api/types';
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
  @ApiOkResponse({ type: ImageAdminDto })
  upload$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @UploadedFile() image: Express.Multer.File
  ): Observable<Image> {
    return this.adminImagesService.upload$(
      entityId,
      image.originalname,
      false,
      image
    );
  }

  @Post('upload-three-sixty')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiOkResponse({ type: ImageAdminDto })
  uploadThreeSixty$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @UploadedFile() threeSixtyImage: Express.Multer.File
  ): Observable<Image> {
    return this.adminImagesService.upload$(
      entityId,
      threeSixtyImage.originalname,
      true,
      threeSixtyImage
    );
  }

  @Put(':id')
  @ApiOkResponse({ type: ImageAdminDto })
  update$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() imageUpdate: ImageUpdateDto
  ): Observable<Image> {
    return this.adminImagesService.update$(id, entityId, imageUpdate);
  }

  @Put(':id/:imageDimensionType/three-sixty-settings')
  @ApiOkResponse({ type: ImageAdminDto })
  updateThreeSixtySettings$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('imageDimensionType', new ParseEnumPipe(ImageDimensionType))
    imageDimensionType: ImageDimensionType,
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() threeSixtySettings: ThreeSixtySettingsDto
  ): Observable<Image> {
    return this.adminImagesService.updateThreeSixtySettings$(
      id,
      entityId,
      imageDimensionType,
      threeSixtySettings
    );
  }

  @Put(':id/processing/:isProcessing')
  @ApiOkResponse({ type: ImageAdminDto })
  setIsProcessing$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('isProcessing', ParseBoolPipe) isProcessing: boolean,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.adminImagesService.setIsProcessing$(id, entityId, isProcessing);
  }

  @Get(':id')
  @ApiOkResponse({ type: ImageAdminDto })
  findOne$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<Image> {
    return this.adminImagesService.findOne$(id, entityId);
  }

  @Get(':id/:imageDimensionType/data-uri')
  @ApiOkResponse({ type: String })
  findDataUri$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('imageDimensionType', new ParseEnumPipe(ImageDimensionType))
    imageDimensionType: ImageDimensionType,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<string> {
    return this.adminImagesService.findDataUri$(
      id,
      entityId,
      imageDimensionType
    );
  }

  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.adminImagesService.remove$(id, entityId);
  }
}
