import { Controller, Get, Param } from '@nestjs/common';

import { AdminImagesService } from './admin-images.service';

@Controller('admin/images')
export class AdminImagesController {
  constructor(private readonly adminImagesService: AdminImagesService) {}

  @Get()
  async getImages(): Promise<string[]> {
    return await this.adminImagesService.getImages();
  }

  @Get(':path')
  async getEvent(@Param() path: string): Promise<string> {
    return await this.adminImagesService.getImage(
      'resized-image/Home/images/Small/0012.jpg'
    );
  }
}
