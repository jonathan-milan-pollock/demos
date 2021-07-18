import {
  Controller,
  Body,
  Param,
  Post,
  Delete,
  HttpCode,
  Put,
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
  Video,
  VideoAddDto,
  VideoDimensionType,
  VideoDto,
  VideoUpdateDto,
} from '@dark-rush-photography/shared/types';
import { FileUploadDto } from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminVideosService } from './admin-videos.service';

@Controller({ path: 'admin/videos', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Videos')
export class AdminVideosController {
  constructor(private readonly adminVideosService: AdminVideosService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiOkResponse({ type: VideoDto })
  upload$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @UploadedFile() video: Express.Multer.File
  ): Observable<Video> {
    return this.adminVideosService.upload$(
      entityId,
      video.originalname,
      false,
      video
    );
  }

  @Post('upload-three-sixty')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiOkResponse({ type: VideoDto })
  uploadThreeSixty$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @UploadedFile() threeSixtyVideo: Express.Multer.File
  ): Observable<Video> {
    return this.adminVideosService.upload$(
      entityId,
      threeSixtyVideo.originalname,
      true,
      threeSixtyVideo
    );
  }

  @Post('add')
  @ApiOkResponse({ type: VideoDto })
  add$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() videoAdd: VideoAddDto
  ): Observable<Video> {
    return this.adminVideosService.add$(entityId, videoAdd);
  }

  @Put(':id')
  @ApiOkResponse({ type: VideoDto })
  update$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() videoUpdate: VideoUpdateDto
  ): Observable<Video> {
    return this.adminVideosService.update$(id, entityId, videoUpdate);
  }

  @Put(':id/processing/:isProcessing')
  @ApiOkResponse({ type: VideoDto })
  setIsProcessing$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('isProcessing', ParseBoolPipe) isProcessing: boolean,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.adminVideosService.setIsProcessing$(id, entityId, isProcessing);
  }

  @Get(':id')
  @ApiOkResponse({ type: VideoDto })
  findOne$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<Video> {
    return this.adminVideosService.findOne$(id, entityId);
  }

  @Get(':id/:videoDimensionType/data-uri')
  @ApiOkResponse({ type: String })
  findDataUri$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('videoDimensionType', new ParseEnumPipe(VideoDimensionType))
    videoDimensionType: VideoDimensionType,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<string> {
    return this.adminVideosService.findDataUri$(
      id,
      entityId,
      videoDimensionType
    );
  }

  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.adminVideosService.remove$(id, entityId);
  }
}
