import { Test } from '@nestjs/testing';

import { DestinationsService } from './destinations.service';

describe('AppService', () => {
  let service: DestinationsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [DestinationsService],
    }).compile();

    service = app.get<DestinationsService>(DestinationsService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      //expect(service.getHello()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
