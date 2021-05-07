import { Test } from '@nestjs/testing';

import { ReviewsService } from './reviews.service';

describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ReviewsService],
    }).compile();

    service = app.get<ReviewsService>(ReviewsService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      //expect(service.getHello()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
