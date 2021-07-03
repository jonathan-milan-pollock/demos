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

import { ADMIN, Video } from '@dark-rush-photography/shared/types';
import {
  FileUploadDto,
  VideoAddDto,
  VideoDto,
  VideoUpdateDto,
} from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminVideosService } from './admin-videos.service';

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
    @Body() videoAdd: VideoAddDto
  ): Observable<Video> {
    return this.adminVideosService.add$(entityId, videoAdd);
  }

  @Roles(ADMIN)
  @Post('upload-video')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @HttpCode(204)
  uploadVideo$(
    @Query('entityId') entityId: string,
    @UploadedFile() video: Express.Multer.File
  ): Observable<void> {
    return this.adminVideosService.uploadVideo$(entityId, video);
  }

  @Roles(ADMIN)
  @Post(':id/update')
  @HttpCode(204)
  updateProcess$(
    @Param('id') id: string,
    @Query('entityId') entityId: string,
    @Body() videoUpdate: VideoUpdateDto
  ): Observable<void> {
    return this.adminVideosService.updateProcess$(id, entityId, videoUpdate);
  }

  @Roles(ADMIN)
  @Put(':id')
  @ApiOkResponse({ type: VideoDto })
  update$(
    @Param('id') id: string,
    @Query('entityId') entityId: string,
    @Body() videoUpdate: VideoUpdateDto
  ): Observable<Video> {
    return this.adminVideosService.update$(id, entityId, videoUpdate);
  }

  @Roles(ADMIN)
  @Post(':id/post')
  @HttpCode(204)
  postProcess$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.adminVideosService.postProcess$(id, entityId);
  }

  @Roles(ADMIN)
  @Get(':id')
  @ApiOkResponse({ type: VideoDto })
  findOne$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<Video> {
    return this.adminVideosService.findOne$(id, entityId);
  }

  @Roles(ADMIN)
  @Post(':id/remove')
  @HttpCode(204)
  removeProcess$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.adminVideosService.removeProcess$(id, entityId);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.adminVideosService.remove$(id, entityId);
  }
}
