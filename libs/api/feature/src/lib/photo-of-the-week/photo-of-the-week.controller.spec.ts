import { Test, TestingModule } from '@nestjs/testing';

import { PhotoOfTheWeekService } from './photo-of-the-week.service';
import { PhotoOfTheWeekController } from './photo-of-the-week.controller';

describe('DestinationsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PhotoOfTheWeekController],
      providers: [PhotoOfTheWeekService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const photoOfTheWeekController = app.get<PhotoOfTheWeekController>(
        PhotoOfTheWeekController
      );
      expect(photoOfTheWeekController.getWeeklyPhotos()).toEqual({
        message: 'Hello',
      });
    });
  });
});
