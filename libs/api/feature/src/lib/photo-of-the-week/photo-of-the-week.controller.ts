import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import { PhotoOfTheWeekService } from './photo-of-the-week.service';

@Controller('photo-of-the-week')
export class PhotoOfTheWeekController {
  constructor(private readonly photoOfTheWeekService: PhotoOfTheWeekService) {}

  @Get()
  async getWeeklyPhotos(): Promise<PhotoOfTheWeek[]> {
    return await this.photoOfTheWeekService.getWeeklyPhotos();
  }

  @Get(':id')
  async getPhotoOfTheWeek(@Param() id: string): Promise<PhotoOfTheWeek> {
    return this.photoOfTheWeekService.getPhotoOfTheWeek(id);
  }

  @Post()
  async addPhotoOfTheWeek(
    @Body() photoOfTheWeek: PhotoOfTheWeek
  ): Promise<{ id: string }> {
    const id = await this.photoOfTheWeekService.addPhotoOfTheWeek(
      photoOfTheWeek
    );
    return { id };
  }

  @Put(':id')
  async updatePhotoOfTheWeek(
    @Param() id: string,
    @Body() photoOfTheWeek: PhotoOfTheWeek
  ): Promise<{ slug: string }> {
    return {
      slug: await this.photoOfTheWeekService.updatePhotoOfTheWeek(
        id,
        photoOfTheWeek
      ),
    };
  }

  @Delete(':id')
  async deletePhotoOfTheWeek(@Param() id: string): Promise<void> {
    await this.photoOfTheWeekService.deletePhotoOfTheWeek(id);
  }
}
