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
  async getWeeklyPhotosAsync(): Promise<PhotoOfTheWeek[]> {
    return await this.photoOfTheWeekService.getWeeklyPhotosAsync();
  }

  @Get(':id')
  async getPhotoOfTheWeek(@Param() id: string): Promise<PhotoOfTheWeek> {
    return this.photoOfTheWeekService.getPhotoOfTheWeekAsync(id);
  }

  @Post()
  async addPhotoOfTheWeekAsync(
    @Body() photoOfTheWeek: PhotoOfTheWeek
  ): Promise<{ id: string }> {
    const id = await this.photoOfTheWeekService.addPhotoOfTheWeekAsync(
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
      slug: await this.photoOfTheWeekService.updatePhotoOfTheWeekAsync(
        id,
        photoOfTheWeek
      ),
    };
  }

  @Delete(':id')
  async deletePhotoOfTheWeek(@Param() id: string): Promise<void> {
    await this.photoOfTheWeekService.deletePhotoOfTheWeekAsync(id);
  }
}
