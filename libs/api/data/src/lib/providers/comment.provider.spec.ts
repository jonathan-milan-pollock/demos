import { Test } from '@nestjs/testing';
import { CommentProvider } from './comment.provider';

describe('CommentProvider', () => {
  let commentProvider: CommentProvider;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CommentProvider],
    }).compile();

    commentProvider = moduleRef.get<CommentProvider>(CommentProvider);
  });

  /*
  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

      expect(await catsController.findAll()).toBe(result);
    });
  });*/
});
