import {
  Controller,
  Body,
  Param,
  UseGuards,
  Post,
  Delete,
  HttpCode,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, Video } from '@dark-rush-photography/shared-types';
import {
  FileUploadDto,
  VideoAddDto,
  VideoDto,
  VideoUpdateDto,
} from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminVideosService } from './admin-videos.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin/v1/videos')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Videos')
export class AdminVideosController {
  constructor(private readonly adminVideosService: AdminVideosService) {}

  @Roles(ADMIN)
  @Post()
  @ApiOkResponse({ type: VideoDto })
  add$(
    @Query('entityId') entityId: string,
    @Body() video: VideoAddDto
  ): Observable<Video> {
    return this.adminVideosService.add$(entityId, video);
  }

  @Roles(ADMIN)
  @Put(':videoId')
  @ApiOkResponse({ type: VideoDto })
  update$(
    @Param('videoId') videoId: string,
    @Query('entityId') entityId: string,
    @Body() video: VideoUpdateDto
  ): Observable<Video> {
    return this.adminVideosService.update$(entityId, videoId, video);
  }

  @Roles(ADMIN)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  uploadVideo$(
    @Query('entityId') entityId: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<Video> {
    return this.adminVideosService.upload$(entityId, file);
  }

  @Roles(ADMIN)
  @Delete(':videoId')
  @HttpCode(204)
  delete$(
    @Param('videoId') videoId: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.adminVideosService.remove$(entityId, videoId);
  }
}
