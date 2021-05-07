import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import {
  Destination,
  ReadableDate,
  Location,
  Image,
  ThreeSixtyImage,
  Video,
  Flyover,
  ExtendedReality,
  SocialMedia,
} from '@dark-rush-photography/shared-types';

export type DestinationModel = DestinationDocument & mongoose.Document;

@Schema()
export class DestinationDocument implements Destination {
  @Prop({ type: String, required: true })
  id = '';

  @Prop({ type: String, required: true })
  slug = '';

  @Prop({ type: String, required: true })
  title = '';

  @Prop({ type: String, required: true })
  description = '';

  @Prop({ type: [String], required: true })
  keywords: ReadonlyArray<string> = [];

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

  @Prop({ type: { srcPath: String, titleTrackPath: String } })
  flyOver?: Flyover;

  @Prop({ type: { srcPath: String } })
  extendedReality?: ExtendedReality;

  @Prop({ type: [{ type: String, url: String }] })
  socialMedia: ReadonlyArray<SocialMedia> = [];

  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
  destinations: ReadonlyArray<Destination> = [];
}

export const DestinationSchema = SchemaFactory.createForClass(
  DestinationDocument
);
