import { Test } from '@nestjs/testing';

import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [EventsService],
    }).compile();

    service = app.get<EventsService>(EventsService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      //expect(service.getHello()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
