import { Controller, Body, Param, Post, Put, Delete } from '@nestjs/common';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import { AdminPhotoOfTheWeekService } from './admin-photo-of-the-week.service';

@Controller('admin/photo-of-the-week')
export class AdminPhotoOfTheWeekController {
  constructor(
    private readonly adminPhotoOfTheWeekService: AdminPhotoOfTheWeekService
  ) {}

  @Post()
  async addPhotoOfTheWeek(
    @Body() photoOfTheWeek: PhotoOfTheWeek
  ): Promise<{ id: string }> {
    const id = await this.adminPhotoOfTheWeekService.addPhotoOfTheWeek(
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
      slug: await this.adminPhotoOfTheWeekService.updatePhotoOfTheWeek(
        id,
        photoOfTheWeek
      ),
    };
  }

  @Delete(':id')
  async deletePhotoOfTheWeek(@Param() id: string): Promise<void> {
    await this.adminPhotoOfTheWeekService.deletePhotoOfTheWeek(id);
  }
}
