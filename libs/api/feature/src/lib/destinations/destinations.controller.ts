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
import { Public } from '@dark-rush-photography/api/util';
import { DestinationsService } from './destinations.service';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get()
  @Public()
  async getDestinations(): Promise<Destination[]> {
    return await this.destinationsService.getDestinations();
  }

  @Get(':id')
  async getDestination(@Param() id: string): Promise<Destination> {
    return this.destinationsService.getDestination(id);
  }

  @Post()
  async addDestination(
    @Body() destination: Destination
  ): Promise<{ id: string }> {
    const id = await this.destinationsService.addDestination(destination);
    return { id };
  }

  @Put(':id')
  async updateDestination(
    @Param() id: string,
    @Body() destination: Destination
  ): Promise<{ slug: string }> {
    return {
      slug: await this.destinationsService.updateDestination(id, destination),
    };
  }

  @Delete(':id')
  async deleteDestination(@Param() id: string): Promise<void> {
    await this.destinationsService.deleteDestination(id);
  }
}
