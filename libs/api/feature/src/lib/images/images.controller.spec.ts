import { Test, TestingModule } from '@nestjs/testing';

import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

describe('DestinationsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [ImagesService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const photoOfTheWeekController = app.get<ImagesController>(
        ImagesController
      );
    });
  });
});
