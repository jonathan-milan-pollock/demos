import { Test } from '@nestjs/testing';

import { ExifImageService } from './exif-image.service';

describe('ResizeImageService', () => {
  let service: ExifImageService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ExifImageService],
    }).compile();

    service = app.get<ExifImageService>(ExifImageService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      //expect(service.getHello()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
