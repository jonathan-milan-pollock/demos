import {
  Controller,
  Body,
  Param,
  Post,
  Delete,
  HttpCode,
  Headers,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  Get,
  ParseUUIDPipe,
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

import { Video } from '@dark-rush-photography/shared/types';
import {
  FileUploadDto,
  VideoDto,
  HlsVideoAddDto,
  VideoUpdateDto,
} from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminVideosService } from './admin-videos.service';

@Controller('v1/admin/videos')
@ApiBearerAuth()
@ApiTags('Admin Videos')
export class AdminVideosController {
  constructor(private readonly adminVideosService: AdminVideosService) {}

  @Post('hls')
  @ApiOkResponse({ type: VideoDto })
  addHlsVideo$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() hlsVideoAdd: HlsVideoAddDto
  ): Observable<Video> {
    return this.adminVideosService.addHlsVideo$(entityId, hlsVideoAdd);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @HttpCode(204)
  upload$(
    @Headers('X-FILE-NAME') fileName: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @UploadedFile() video: Express.Multer.File
  ): Observable<Video> {
    return this.adminVideosService.upload$(fileName, entityId, video);
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

  @Get(':id')
  @ApiOkResponse({ type: VideoDto })
  findOne$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<Video> {
    return this.adminVideosService.findOne$(id, entityId);
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
