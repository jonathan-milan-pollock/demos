import { Test, TestingModule } from '@nestjs/testing';

import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';

describe('DestinationsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [DestinationsController],
      providers: [DestinationsService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const destinationsController = app.get<DestinationsController>(
        DestinationsController
      );
      expect(destinationsController.getHello()).toEqual({ message: 'Hello' });
    });
  });
});
