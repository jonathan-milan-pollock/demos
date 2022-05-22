import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import {
  DEFAULT_ENTITY_GROUP,
  Entity,
  EntityType,
  Image,
  Location,
  ImageVideo,
  WatermarkedType,
  Dimension,
} from '@dark-rush-photography/shared/types';
import { locationSchema } from './location.schema';
import { imageSchema } from './image.schema';
import { imageVideoSchema } from './image-video.schema';
import { dimensionSchema } from './dimension.schema';

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

  @Prop({ type: Boolean, required: true, default: false })
  isPublic!: boolean;

  @Prop({ type: String, required: false })
  title?: string;

  @Prop({ type: String, required: false })
  text?: string;

  @Prop({ type: String, required: false })
  createdDate?: string;

  @Prop({ type: String, required: false })
  publishedDate?: string;

  @Prop({ type: String, required: false })
  seoDescription?: string;

  @Prop({ type: [String], required: true })
  seoKeywords!: string[];

  @Prop({
    type: locationSchema,
    required: false,
  })
  location?: Location;

  @Prop({ type: Boolean, required: true, default: false })
  starredImageIsCentered!: boolean;

  @Prop({
    type: [imageSchema],
    required: true,
  })
  images!: Image[];

  @Prop({
    type: imageVideoSchema,
    required: false,
  })
  imageVideo?: ImageVideo;

  @Prop({
    type: dimensionSchema,
    required: false,
  })
  tileDimension?: Dimension;

  @Prop({ type: Boolean, required: true, default: false })
  isDeleted!: boolean;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
