import { Test } from '@nestjs/testing';

import { PhotoOfTheWeekService } from './photo-of-the-week.service';

describe('PhotoOfTheWeekService', () => {
  let service: PhotoOfTheWeekService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [PhotoOfTheWeekService],
    }).compile();

    service = app.get<PhotoOfTheWeekService>(PhotoOfTheWeekService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getPhotoOfTheWeek('')).toEqual({
        message: 'Welcome to api!',
      });
    });
  });
});
