import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import {
  About,
  BestOf,
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
    About,
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
      'BestOfChildren',
      'BestOfEvents',
      'BestOfLandscapes',
      'BestOfNature',
      'BestOfRealEstate',
      'Destination',
      'Event',
      'Favorites',
      'PhotoOfTheWeek',
      'Review',
      'Reviews',
      'SocialMedia',
    ],
    required: true,
  })
  type!: DocumentType;

  @Prop({ type: String, required: true })
  slug!: string;

  @Prop({ type: Number, required: true, default: 0 })
  group!: number;

  @Prop({ type: Boolean, required: true })
  isPublic!: boolean;

  @Prop({ type: String, required: false })
  title?: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: [String], required: true })
  keywords!: string[];

  @Prop({ type: String, required: false })
  datePublished?: string;

  @Prop({
    type: locationSchema,
    required: false,
  })
  location?: Location;

  @Prop({ type: Boolean, required: true, default: false })
  useTitleImage!: boolean;

  @Prop({ type: [String], required: true })
  text!: string[];

  @Prop({
    type: [imageSchema],
    required: true,
  })
  images!: Image[];

  @Prop({
    type: [videoSchema],
    required: true,
  })
  videos!: Video[];

  @Prop({ type: flyOverSchema, required: false })
  flyOver?: FlyOver;

  @Prop({ type: extendedRealitySchema, required: false })
  extendedReality?: ExtendedReality;

  @Prop({ type: String, required: false })
  websiteUrl?: string;

  @Prop({ type: [socialMediaSchema], required: true })
  socialMediaUrls!: SocialMedia[];

  @Prop({ type: [emotionSchema], required: true })
  emotions!: Emotion[];

  @Prop({ type: [commentSchema], required: true })
  comments!: Comment[];
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
