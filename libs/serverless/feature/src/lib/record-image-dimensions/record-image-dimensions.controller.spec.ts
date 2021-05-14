import { Test, TestingModule } from '@nestjs/testing';

import { RecordImageDimensionsService } from './record-image-dimensions.service';
import { RecordImageDimensionsController } from './record-image-dimensions.controller';

describe('RecordImageDimensionsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [RecordImageDimensionsController],
      providers: [RecordImageDimensionsService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const recordImageDimensionsController = app.get<RecordImageDimensionsController>(
        RecordImageDimensionsController
      );
      //expect(recordImageDimensionsController.getHello()).toEqual({ message: 'Hello' });
    });
  });
});
