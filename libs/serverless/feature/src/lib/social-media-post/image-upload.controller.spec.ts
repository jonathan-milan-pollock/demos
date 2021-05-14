import { Test, TestingModule } from '@nestjs/testing';

import { ImageUploadService } from './image-upload.service';
import { ImageUploadController } from './image-upload.controller';

describe('ExifImageController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ImageUploadController],
      providers: [ImageUploadService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const imageUploadController = app.get<ImageUploadController>(
        ImageUploadController
      );
      //expect(imageUploadController.getHello()).toEqual({ message: 'Hello' });
    });
  });
});
