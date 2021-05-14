import { Test, TestingModule } from '@nestjs/testing';

import { ResizeImageService } from './resize-image.service';
import { ResizeImageController } from './resize-image.controller';

describe('DestinationsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ResizeImageController],
      providers: [ResizeImageService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const resizeImageController = app.get<ResizeImageController>(
        ResizeImageController
      );
      //expect(destinationsController.getHello()).toEqual({ message: 'Hello' });
    });
  });
});
