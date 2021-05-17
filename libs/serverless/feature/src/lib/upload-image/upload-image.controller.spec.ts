import { Test, TestingModule } from '@nestjs/testing';

import { UploadImageController } from './upload-image.controller';
import { UploadImageService } from './upload-image.service';

describe('UploadImageController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UploadImageController],
      providers: [UploadImageService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const uploadImageController = app.get<UploadImageController>(
        UploadImageController
      );
      //expect(uploadImageController.getHello()).toEqual({ message: 'Hello' });
    });
  });
});
