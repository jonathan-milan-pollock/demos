import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import {
  DEFAULT_ENTITY_GROUP,
  Entity,
  EntityType,
  Image,
  Location,
  Video,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { locationSchema } from './location.schema';
import { imageSchema } from './image.schema';
import { videoSchema } from './video.schema';

export type DocumentModel = Document & mongoose.Document;

@Schema({ autoIndex: true, shardKey: { type: 'Hash' } })
export class Document implements Entity {
  @Prop({
    type: String,
    enum: Object.keys(EntityType),
    required: true,
    index: true,
    unique: false,
  })
  type!: EntityType;

  @Prop({ type: String, required: false })
  id?: string;

  @Prop({ type: String, required: false })
  googleDriveFolderId?: string;

  @Prop({
    type: String,
    enum: Object.keys(WatermarkedType),
    required: true,
  })
  watermarkedType!: WatermarkedType;

  @Prop({ type: String, required: true, default: DEFAULT_ENTITY_GROUP })
  group!: string;

  @Prop({ type: String, required: true })
  slug!: string;

  @Prop({ type: Number, required: true, default: 0 })
  order!: number;

  @Prop({ type: String, required: false })
  title?: string;

  @Prop({ type: String, required: false })
  seoDescription?: string;

  @Prop({ type: [String], required: true })
  seoKeywords!: string[];

  @Prop({ type: String, required: false })
  dateCreated?: string;

  @Prop({ type: String, required: false })
  datePublished?: string;

  @Prop({
    type: locationSchema,
    required: true,
  })
  location!: Location;

  @Prop({ type: Boolean, required: true, default: false })
  starredImageIsCentered!: boolean;

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

  @Prop({ type: Boolean, required: true, default: false })
  isPublic!: boolean;

  @Prop({ type: Boolean, required: true, default: false })
  isPublished!: boolean;

  @Prop({ type: Boolean, required: true, default: false })
  isProcessing!: boolean;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
