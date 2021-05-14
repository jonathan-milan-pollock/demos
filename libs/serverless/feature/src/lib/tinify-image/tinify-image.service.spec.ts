import { Test } from '@nestjs/testing';

import { TinifyImageService } from './tinify-image.service';

describe('TinifyImageService', () => {
  let service: TinifyImageService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TinifyImageService],
    }).compile();

    service = app.get<TinifyImageService>(TinifyImageService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      //expect(service.getHello()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
