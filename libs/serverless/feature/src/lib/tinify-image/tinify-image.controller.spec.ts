import { Test, TestingModule } from '@nestjs/testing';

import { TinifyImageController } from './tinify-image.controller';
import { TinifyImageService } from './tinify-image.service';

describe('DestinationsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TinifyImageController],
      providers: [TinifyImageService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const tinifyImageController = app.get<TinifyImageController>(
        TinifyImageController
      );
      //expect(destinationsController.getHello()).toEqual({ message: 'Hello' });
    });
  });
});
