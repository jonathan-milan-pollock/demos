import { Controller, Put, Delete, Param } from '@nestjs/common';

import { ImagesService } from './images.service';

@Controller('v1/user/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Put(':id/star')
  addStar(@Param() id: string): void {
    console.log(`star ${id} image`);
  }

  @Delete(':id/star')
  deleteStar(@Param() id: string): void {
    console.log(`un-star ${id} image`);
  }
}
