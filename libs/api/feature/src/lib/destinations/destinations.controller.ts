import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import { Destination } from '@dark-rush-photography/shared-types';
import { DestinationsService } from './destinations.service';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get()
  async getDestinationsAsync(): Promise<Destination[]> {
    return await this.destinationsService.getDestinationsAsync();
  }

  @Get(':id')
  async getPhotoOfTheWeek(@Param() id: string): Promise<Destination> {
    return this.destinationsService.getDestinationAsync(id);
  }

  @Post()
  async addDestinationAsync(
    @Body() destination: Destination
  ): Promise<{ id: string }> {
    const id = await this.destinationsService.addDestinationAsync(destination);
    return { id };
  }

  @Put(':id')
  async updateDestination(
    @Param() id: string,
    @Body() destination: Destination
  ): Promise<{ slug: string }> {
    return {
      slug: await this.destinationsService.updateDestinationAsync(
        id,
        destination
      ),
    };
  }

  @Delete(':id')
  async deleteDestination(@Param() id: string): Promise<void> {
    await this.destinationsService.deleteDestinationAsync(id);
  }
}
