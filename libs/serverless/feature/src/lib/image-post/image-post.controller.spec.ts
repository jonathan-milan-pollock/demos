import { Test, TestingModule } from '@nestjs/testing';

import { ImagePostService } from './image-post.service';
import { ImagePostController } from './image-post.controller';

describe('ExifImageController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ImagePostController],
      providers: [ImagePostService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const imagePostController = app.get<ImagePostController>(
        ImagePostController
      );
      //expect(imageUploadController.getHello()).toEqual({ message: 'Hello' });
    });
  });
});
