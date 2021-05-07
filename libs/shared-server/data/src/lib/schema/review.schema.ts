import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Review } from '@dark-rush-photography/shared-types';

export type ReviewModel = ReviewDocument & mongoose.Document;

@Schema()
export class ReviewDocument implements Review {
  @Prop({ type: String })
  id = '';

  @Prop({ type: String, required: true })
  name = '';

  @Prop({ type: [String], required: true })
  text: ReadonlyArray<string> = [];
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewDocument);
