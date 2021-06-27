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

import { ADMIN, Video } from '@dark-rush-photography/shared-types';
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
    @Body() video: VideoAddDto
  ): Observable<Video> {
    return this.adminVideosService.add$(entityId, video);
  }

  @Roles(ADMIN)
  @Put(':id')
  @ApiOkResponse({ type: VideoDto })
  update$(
    @Param('id') id: string,
    @Query('entityId') entityId: string,
    @Body() video: VideoUpdateDto
  ): Observable<Video> {
    return this.adminVideosService.update$(id, entityId, video);
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
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  upload$(
    @Query('entityId') entityId: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<Video> {
    return this.adminVideosService.upload$(entityId, file);
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
