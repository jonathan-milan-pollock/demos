import { Test } from '@nestjs/testing';

import { RecordImageDimensionsService } from './record-image-dimensions.service';

describe('RecordImageDimensionsService', () => {
  let service: RecordImageDimensionsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [RecordImageDimensionsService],
    }).compile();

    service = app.get<RecordImageDimensionsService>(
      RecordImageDimensionsService
    );
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      //expect(service.getHello()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
