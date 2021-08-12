import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import {
  Comment,
  EntityType,
  Emotion,
  Image,
  ImageDimension,
  Location,
  SocialMediaUrl,
  Video,
  VideoDimension,
  Entity,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/api/types';
import { locationSchema } from './location.schema';
import { imageSchema } from './image.schema';
import { imageDimensionSchema } from './image-dimension.schema';
import { videoSchema } from './video.schema';
import { videoDimensionSchema } from './video-dimension.schema';
import { socialMediaUrlSchema } from './social-media-url.schema';
import { commentSchema } from './comment.schema';
import { emotionSchema } from './emotion.schema';

export type DocumentModel = Document & mongoose.Document;

@Schema({ autoIndex: true, shardKey: { type: 'Hash' } })
export class Document implements Entity {
  @Prop({ type: String, required: false })
  id?: string;

  @Prop({
    type: String,
    enum: Object.keys(EntityType),
    required: true,
    index: true,
    unique: false,
  })
  type!: EntityType;

  @Prop({ type: String, required: true, default: DEFAULT_ENTITY_GROUP })
  group!: string;

  @Prop({ type: String, required: true })
  slug!: string;

  @Prop({ type: Boolean, required: true })
  isPublic!: boolean;

  @Prop({ type: Number, required: true })
  order!: number;

  @Prop({ type: String, required: false })
  title?: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: [String], required: true })
  keywords!: string[];

  @Prop({ type: String, required: false })
  dateCreated?: string;

  @Prop({ type: String, required: false })
  datePublished?: string;

  @Prop({
    type: locationSchema,
    required: false,
  })
  location?: Location;

  @Prop({ type: Boolean, required: true, default: false })
  useTileImage!: boolean;

  @Prop({ type: [String], required: true })
  text!: string[];

  @Prop({
    type: [imageSchema],
    required: true,
  })
  images!: Image[];

  @Prop({
    type: [imageDimensionSchema],
    required: true,
  })
  imageDimensions!: ImageDimension[];

  @Prop({
    type: [videoSchema],
    required: true,
  })
  videos!: Video[];

  @Prop({
    type: [videoDimensionSchema],
    required: true,
  })
  videoDimensions!: VideoDimension[];

  @Prop({ type: Boolean, required: true, default: false })
  hasExtendedReality!: boolean;

  @Prop({ type: String, required: false })
  websiteUrl?: string;

  @Prop({ type: [socialMediaUrlSchema], required: true })
  socialMediaUrls!: SocialMediaUrl[];

  @Prop({ type: [commentSchema], required: true })
  comments!: Comment[];

  @Prop({ type: [emotionSchema], required: true })
  emotions!: Emotion[];

  @Prop({ type: Boolean, required: true, default: false })
  isProcessing!: boolean;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
