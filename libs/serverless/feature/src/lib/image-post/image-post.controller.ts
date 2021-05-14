import { Controller, Get, Post, Req } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';
import { ImagePostService } from './image-post.service';

@Controller('image-upload')
export class ImagePostController {
  constructor(private readonly imagePostService: ImagePostService) {}

  @Get()
  getImageUpload(): string {
    return 'OK';
  }

  @Post()
  async uploadImage(@Req() request: AzureRequest): Promise<void> {
    request.context.done(
      null,
      await this.imagePostService.uploadImage(file, request)
    );
  }
}
