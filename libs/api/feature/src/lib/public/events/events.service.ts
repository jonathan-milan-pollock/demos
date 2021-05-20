import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Event } from '@dark-rush-photography/shared-types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Document.name)
    private readonly eventModel: Model<DocumentModel>
  ) {}

  async getEvents(): Promise<Event[]> {
    return await this.eventModel.find({ type: 'Event' }).exec();
  }

  async getEvent(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException('Could not find event');
    }
    return event;
  }
}
