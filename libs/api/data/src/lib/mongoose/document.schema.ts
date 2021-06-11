import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import {
  BestOf,
  BestOfType,
  Comment,
  Destination,
  DocumentType,
  Emotion,
  Event,
  ExtendedReality,
  Favorites,
  FlyOver,
  Image,
  Location,
  PhotoOfTheWeek,
  Review,
  Reviews,
  SocialMedia,
  Video,
} from '@dark-rush-photography/shared-types';
import { locationSchema } from './location.schema';
import { emotionSchema } from './emotion.schema';
import { commentSchema } from './comment.schema';
import { imageSchema } from './image.schema';
import { videoSchema } from './video.schema';
import { flyOverSchema } from './fly-over.schema';
import { extendedRealitySchema } from './extended-reality.schema';
import { socialMediaSchema } from './social-media.schema';

export type DocumentModel = Document & mongoose.Document;

@Schema()
export class Document
  implements
    BestOf,
    Destination,
    Event,
    Favorites,
    PhotoOfTheWeek,
    Review,
    Reviews {
  @Prop({ type: String })
  id?: string;

  @Prop({
    type: String,
    enum: [
      'About',
      'BestOf',
      'Destination',
      'Event',
      'Favorites',
      'PhotoOfTheWeek',
      'Review',
      'Reviews',
    ],
    required: true,
  })
  type!: DocumentType;

  @Prop({
    type: String,
    enum: ['Children', 'Events', 'Landscapes', 'Nature', 'RealEstate'],
    required: true,
  })
  bestOfType!: BestOfType;

  @Prop({ type: String, required: true, default: ' ' })
  slug!: string;

  @Prop({ type: Number, required: true, default: 0 })
  group!: number;

  @Prop({ type: Boolean, required: true })
  isPublic!: boolean;

  @Prop({ type: String, required: true, default: ' ' })
  title!: string;

  @Prop({ type: String, required: true, default: ' ' })
  description!: string;

  @Prop({ type: [String], required: true })
  keywords!: ReadonlyArray<string>;

  @Prop({ type: String, required: true, default: ' ' })
  dateCreated!: string;

  @Prop({ type: String, required: false })
  datePublished?: string;

  @Prop({
    type: locationSchema,
    required: true,
    default: { country: 'United States' },
  })
  location!: Location;

  @Prop({ type: Boolean, required: true, default: false })
  useTitleImage!: boolean;

  @Prop({ type: [String], required: true })
  text!: ReadonlyArray<string>;

  @Prop({
    type: imageSchema,
    required: true,
    default: {},
  })
  image = {} as Image;

  @Prop({
    type: [imageSchema],
    required: true,
  })
  images: ReadonlyArray<Image> = [];

  @Prop({
    type: [videoSchema],
    required: true,
  })
  videos: ReadonlyArray<Video> = [];

  @Prop({ type: flyOverSchema, required: false })
  flyOver?: FlyOver;

  @Prop({ type: extendedRealitySchema, required: false })
  extendedReality?: ExtendedReality;

  @Prop({ type: [String], required: true })
  websiteUrls: ReadonlyArray<string> = [];

  @Prop({ type: [socialMediaSchema], required: true })
  socialMediaUrls: ReadonlyArray<SocialMedia> = [];

  @Prop({ type: [emotionSchema], required: true })
  emotions: ReadonlyArray<Emotion> = [];

  @Prop({ type: [commentSchema], required: true })
  comments: ReadonlyArray<Comment> = [];
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
