import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import {
  Comment,
  EntityType,
  Emotion,
  Image,
  ImageDimension,
  Location,
  Video,
  Entity,
  DEFAULT_ENTITY_GROUP,
} from '@dark-rush-photography/shared/types';
import { locationSchema } from './location.schema';
import { imageSchema } from './image.schema';
import { imageDimensionSchema } from './image-dimension.schema';
import { videoSchema } from './video.schema';
import { commentSchema } from './comment.schema';
import { emotionSchema } from './emotion.schema';

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

  @Prop({ type: String, required: true, default: DEFAULT_ENTITY_GROUP })
  group!: string;

  @Prop({ type: String, required: true })
  slug!: string;

  @Prop({ type: Number, required: true })
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
    required: false,
  })
  location?: Location;

  @Prop({ type: Boolean, required: true, default: false })
  photoAlbumImageIsCentered!: boolean;

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

  @Prop({ type: [commentSchema], required: true })
  comments!: Comment[];

  @Prop({ type: [emotionSchema], required: true })
  emotions!: Emotion[];

  @Prop({ type: Boolean, required: true })
  isPublic!: boolean;

  @Prop({ type: Boolean, required: true, default: false })
  isPublishing!: boolean;

  @Prop({ type: Boolean, required: true, default: false })
  isPublished!: boolean;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
