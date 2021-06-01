import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import {
  Review,
  PhotoOfTheWeek,
  Event,
  Destination,
  DocumentType,
  ReadableDate,
  Location,
  Image,
  ThreeSixtyImage,
  Video,
  Flyover,
  ExtendedReality,
  SocialMedia,
  BestOfChildren,
  BestOfEvents,
  Favorites,
} from '@dark-rush-photography/shared-types';

export type DocumentModel = Document & mongoose.Document;

@Schema()
export class Document
  implements
    BestOfChildren,
    BestOfEvents,
    Destination,
    Event,
    Favorites,
    PhotoOfTheWeek,
    Review {
  @Prop({ type: String })
  id = '';

  @Prop({ type: String, required: true })
  type: DocumentType = 'None';

  @Prop({ type: Number })
  group = 0;

  @Prop({ type: String })
  slug = '';

  @Prop({ type: String, required: true })
  title = '';

  @Prop({ type: String })
  description = '';

  @Prop({ type: [String] })
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
  })
  location: Location = { country: '' };

  @Prop({ type: Boolean })
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

export const DocumentSchema = SchemaFactory.createForClass(Document);
