import { Test, TestingModule } from '@nestjs/testing';

import { ExifImageService } from './exif-image.service';
import { ExifImageController } from './exif-image.controller';

describe('ExifImageController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ExifImageController],
      providers: [ExifImageService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const exifImageController = app.get<ExifImageController>(
        ExifImageController
      );
      //expect(destinationsController.getHello()).toEqual({ message: 'Hello' });
    });
  });
});
