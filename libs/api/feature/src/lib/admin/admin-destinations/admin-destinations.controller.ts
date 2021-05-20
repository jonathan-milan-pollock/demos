import { Controller, Body, Param, Post, Put, Delete } from '@nestjs/common';

import { Destination } from '@dark-rush-photography/shared-types';
import { AdminDestinationsService } from './admin-destinations.service';

@Controller('admin/destinations')
export class AdminDestinationsController {
  constructor(
    private readonly adminDestinationsService: AdminDestinationsService
  ) {}

  @Post()
  async addDestination(
    @Body() destination: Destination
  ): Promise<{ id: string }> {
    const id = await this.adminDestinationsService.addDestination(destination);
    return { id };
  }

  @Put(':id')
  async updateDestination(
    @Param() id: string,
    @Body() destination: Destination
  ): Promise<{ slug: string }> {
    return {
      slug: await this.adminDestinationsService.updateDestination(
        id,
        destination
      ),
    };
  }

  @Delete(':id')
  async deleteDestination(@Param() id: string): Promise<void> {
    await this.adminDestinationsService.deleteDestination(id);
  }
}
