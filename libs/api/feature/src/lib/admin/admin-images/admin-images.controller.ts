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
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  Image,
  ImageDimensionType,
  MediaState,
} from '@dark-rush-photography/shared/types';
import {
  FileUploadDto,
  ImageAdminDto,
  ImageUpdateDto,
  ThreeSixtySettingsDto,
} from '@dark-rush-photography/api/types';
import {
  AdminAuthGuard,
  AdminRole,
  ParseObjectIdPipe,
} from '@dark-rush-photography/api/util';
import { AdminImagesService } from './admin-images.service';

@Controller({ path: 'admin/images', version: '1' })
@UseGuards(AdminAuthGuard)
@ApiBearerAuth()
@ApiTags('Admin Images')
export class AdminImagesController {
  constructor(private readonly adminImagesService: AdminImagesService) {}

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
    return this.adminImagesService.upload$(
      entityId,
      image.originalname,
      false,
      image
    );
  }

  @AdminRole()
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

  @AdminRole()
  @Put(':id')
  @ApiOkResponse({ type: ImageAdminDto })
  update$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() imageUpdate: ImageUpdateDto
  ): Observable<Image> {
    return this.adminImagesService.update$(id, entityId, imageUpdate);
  }

  @AdminRole()
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

  @AdminRole()
  @ApiQuery({
    name: 'state',
    enum: MediaState,
  })
  @Get()
  @ApiOkResponse({ type: [ImageAdminDto] })
  findAll$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Query('state', new ParseEnumPipe(MediaState)) state: MediaState
  ): Observable<ImageAdminDto[]> {
    return this.adminImagesService.findAll$(entityId, state);
  }

  @AdminRole()
  @Get(':id')
  @ApiOkResponse({ type: ImageAdminDto })
  findOne$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<Image> {
    return this.adminImagesService.findOne$(id, entityId);
  }

  @AdminRole()
  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.adminImagesService.remove$(id, entityId);
  }
}
