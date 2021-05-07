import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import {
  Event,
  ReadableDate,
  Location,
  Image,
  ThreeSixtyImage,
  Video,
} from '@dark-rush-photography/shared-types';

export type EventModel = EventDocument & mongoose.Document;

@Schema()
export class EventDocument implements Event {
  @Prop({ type: String, required: true })
  id = '';

  @Prop({ type: String, required: true })
  slug = '';

  @Prop({ type: Number, required: true })
  group = 0;

  @Prop({ type: String, required: true })
  title = '';

  @Prop({ type: String, required: true })
  description = '';

  @Prop({ type: [String], required: true })
  keywords: ReadonlyArray<string> = [];

  @Prop({ type: { month: Number, day: Number, year: Number } })
  dateCreated?: ReadableDate;

  @Prop({ type: { month: Number, day: Number, year: Number } })
  datePublished?: ReadableDate;

  @Prop({
    type: {
      place: String,
      street: String,
      city: String,
      stateOrProvince: String,
      zipCode: String,
      country: String,
    },
    required: true,
  })
  location: Location = { country: '' };

  @Prop({ type: Boolean, required: true })
  useTitleImage = false;

  @Prop({ type: [String], required: true })
  text: ReadonlyArray<string> = [];

  @Prop({
    type: [
      {
        srcPath: String,
        number: Number,
        width: Number,
        height: Number,
      },
    ],
    required: true,
  })
  images: ReadonlyArray<Image> = [];

  @Prop({
    type: [
      {
        type: String,
        srcPath: String,
        pitch: Number,
        yaw: Number,
        hfov: Number,
      },
    ],
    required: true,
  })
  threeSixtyImages: ReadonlyArray<ThreeSixtyImage> = [];

  @Prop({
    type: [
      {
        srcPath: String,
        titleTrack: String,
      },
    ],
    required: true,
  })
  videos: ReadonlyArray<Video> = [];
}

export const EventSchema = SchemaFactory.createForClass(EventDocument);
