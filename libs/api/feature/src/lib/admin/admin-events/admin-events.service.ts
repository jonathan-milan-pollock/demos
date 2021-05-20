import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Event } from '@dark-rush-photography/shared-types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class AdminEventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>
  ) {}

  async addEvent(event: Event): Promise<string> {
    const addedEvent = await new this.eventModel(event).save();
    return addedEvent.id;
  }

  async updateEvent(id: string, event: Event): Promise<string> {
    const foundEvent = await this.eventModel.findById(id);
    if (!foundEvent) {
      throw new NotFoundException('Could not find event');
    }
    await this.eventModel.findByIdAndUpdate(id, event);
    foundEvent?.save();
    return id;
  }

  async deleteEvent(id: string): Promise<void> {
    await this.eventModel.findByIdAndDelete(id);
  }
}
