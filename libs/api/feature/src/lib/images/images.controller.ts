import { Controller, Get, Param } from '@nestjs/common';

import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  async getImages(): Promise<string[]> {
    return await this.imagesService.getImages();
  }

  @Get(':path')
  async getEvent(@Param() path: string): Promise<string> {
    return await this.imagesService.getImage(
      'resized-image/Home/images/Small/0012.jpg'
    );
  }
}
