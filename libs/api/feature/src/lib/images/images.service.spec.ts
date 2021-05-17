import { Test } from '@nestjs/testing';

import { ImagesService } from './images.service';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ImagesService],
    }).compile();

    service = app.get<ImagesService>(ImagesService);
  });
});
