import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Headers,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { FileUploadDto } from '@dark-rush-photography/api/types';
import { ImagePostsService } from '@dark-rush-photography/api/data';

@Controller({ path: 'admin/image-posts', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Image Posts')
export class AdminImagePostsController {
  constructor(private readonly imagePostsService: ImagePostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  create$(
    @Headers('DARK-RUSH-PHOTOGRAPHY-IMAGE-POST-TEXT') text: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<void> {
    return this.imagePostsService.create$(text, file);
  }
}
