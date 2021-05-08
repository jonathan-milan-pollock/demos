import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Event } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
} from '@dark-rush-photography/shared-server/data';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>
  ) {}

  async getEventsAsync(): Promise<Event[]> {
    return await this.eventModel.find({ type: 'Event' }).exec();
  }

  async getEventAsync(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException('Could not find event');
    }
    return event;
  }

  async addEventAsync(event: Event): Promise<string> {
    const addedEvent = await new this.eventModel(event).save();
    return addedEvent.id;
  }

  async updateEventAsync(id: string, event: Event): Promise<string> {
    const foundEvent = await this.eventModel.findById(id);
    if (!foundEvent) {
      throw new NotFoundException('Could not find event');
    }
    await this.eventModel.findByIdAndUpdate(id, event);
    foundEvent?.save();
    return id;
  }

  async deleteEventAsync(id: string): Promise<void> {
    await this.eventModel.findByIdAndDelete(id);
  }
}
