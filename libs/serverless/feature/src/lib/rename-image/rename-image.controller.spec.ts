import { Test, TestingModule } from '@nestjs/testing';

import { RenameImageService } from './rename-image.service';
import { RenameImageController } from './rename-image.controller';

describe('DestinationsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [RenameImageController],
      providers: [RenameImageService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const renameImageController = app.get<RenameImageController>(
        RenameImageController
      );
      //expect(renameImageController.getHello()).toEqual({ message: 'Hello' });
    });
  });
});
