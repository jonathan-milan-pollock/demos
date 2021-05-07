import { Test, TestingModule } from '@nestjs/testing';

import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

describe('ReviewsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [ReviewsService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const reviewsController = app.get<ReviewsController>(ReviewsController);
      // expect(destinationsController.getHello()).toEqual({ message: 'Hello' });
    });
  });
});
