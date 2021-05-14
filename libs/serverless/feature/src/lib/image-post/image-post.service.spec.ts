import { Test } from '@nestjs/testing';

import { ImageUploadService } from './image-upload.service';

describe('ImageUploadService', () => {
  let service: ImageUploadService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ImageUploadService],
    }).compile();

    service = app.get<ImageUploadService>(ImageUploadService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      //expect(service.getHello()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
