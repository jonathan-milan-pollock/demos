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
  MediaState,
  ThreeSixtySettingsDto,
} from '@dark-rush-photography/shared/types';
import { FileUploadDto } from '@dark-rush-photography/shared/types';
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

  @Get()
  @ApiOkResponse({ type: [ImageAdminDto] })
  findAll$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Query('state', ParseObjectIdPipe) state: MediaState
  ): Observable<ImageAdminDto[]> {
    return this.adminImagesService.findAll$(entityId, state);
  }

  @Get(':id')
  @ApiOkResponse({ type: ImageAdminDto })
  findOne$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<Image> {
    return this.adminImagesService.findOne$(id, entityId);
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
