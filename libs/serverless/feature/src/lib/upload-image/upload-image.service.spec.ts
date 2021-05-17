import { Test } from '@nestjs/testing';

import { UploadImageService } from './upload-image.service';

describe('UploadImageService', () => {
  let service: UploadImageService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [UploadImageService],
    }).compile();

    service = app.get<UploadImageService>(UploadImageService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      //expect(service.getHello()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
