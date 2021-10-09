import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Headers,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  EntityMinimalAdminDto,
  FileUploadDto,
} from '@dark-rush-photography/api/types';
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
  @ApiOkResponse({ type: EntityMinimalAdminDto })
  create$(
    @Headers('DARK-RUSH-PHOTOGRAPHY-IMAGE-POST-TEXT') text: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<EntityMinimalAdminDto> {
    return this.imagePostsService.create$(file.originalname, text, file);
  }
}
