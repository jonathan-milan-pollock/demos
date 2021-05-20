import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Destination } from '@dark-rush-photography/shared-types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class AdminDestinationsService {
  constructor(
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>
  ) {}

  async addDestination(destination: Destination): Promise<string> {
    const addedDestination = await new this.destinationModel(
      destination
    ).save();
    return addedDestination.id;
  }

  async updateDestination(
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

  async deleteDestination(id: string): Promise<void> {
    await this.destinationModel.findByIdAndDelete(id);
  }
}
