import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Review } from '@dark-rush-photography/shared-types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class AdminReviewsService {
  constructor(
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>
  ) {}

  async getReviews(): Promise<Review[]> {
    return await this.reviewModel.find().exec();
  }

  async getReview(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id);
    if (!review) {
      throw new NotFoundException(`Could not find review`);
    }
    return review;
  }

  async addReview(review: Review): Promise<string> {
    const addedReview = await new this.reviewModel(review).save();
    return addedReview.id;
  }

  async updateReview(id: string, review: Review): Promise<string> {
    const foundReview = await this.reviewModel.findById(id);
    if (!foundReview) {
      throw new NotFoundException('Could not find review');
    }
    await this.reviewModel.findByIdAndUpdate(id, review);
    foundReview?.save();
    return id;
  }

  async deleteReview(id: string): Promise<void> {
    await this.reviewModel.findByIdAndDelete(id);
  }
}
