import { Test } from '@nestjs/testing';

import { ResizeImageService } from './resize-image.service';

describe('ResizeImageService', () => {
  let service: ResizeImageService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ResizeImageService],
    }).compile();

    service = app.get<ResizeImageService>(ResizeImageService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      //expect(service.getHello()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
