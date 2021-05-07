import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Destination } from '@dark-rush-photography/shared-types';
import {
  DestinationModel,
  DestinationDocument,
} from '@dark-rush-photography/shared-server/data';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(DestinationDocument.name)
    private readonly destinationModel: Model<DestinationModel>
  ) {}

  async getDestinationsAsync(): Promise<Destination[]> {
    return await this.destinationModel.find().exec();
  }

  async getDestinationAsync(id: string): Promise<Destination> {
    const destination = await this.destinationModel.findById(id);
    if (!destination) {
      throw new NotFoundException('Could not find destination');
    }
    return destination;
  }

  async addDestinationAsync(destination: Destination): Promise<string> {
    const addedDestination = await new this.destinationModel(
      destination
    ).save();
    return addedDestination.slug;
  }

  async updateDestinationAsync(
    id: string,
    destination: Destination
  ): Promise<string> {
    const foundDestination = await this.destinationModel.findById(id);
    if (!foundDestination) {
      throw new NotFoundException('Could not find destination');
    }
    await this.destinationModel.findByIdAndUpdate(id, destination);
    foundDestination?.save();
    return id;
  }

  async deleteDestinationAsync(id: string): Promise<void> {
    await this.destinationModel.findByIdAndDelete(id);
  }
}
