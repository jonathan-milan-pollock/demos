import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import * as faker from 'faker';

import { DUMMY_MONGODB_ID } from '@dark-rush-photography/shared/types';
import { ParseObjectIdPipe } from './parse-object-id.pipe';

describe('parse-object-id.pipe', () => {
  let parseObjectIdPipe: ParseObjectIdPipe;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ParseObjectIdPipe],
    }).compile();

    parseObjectIdPipe = moduleRef.get<ParseObjectIdPipe>(ParseObjectIdPipe);
  });

  describe('transform', () => {
    it('should validate that a valid mongo db id is valid', () => {
      const result = parseObjectIdPipe.transform(DUMMY_MONGODB_ID);
      expect(result).toBe(result);
    });

    it('should throw a bad request exception if the mongo db id is invalid', () => {
      const mongoDbId = faker.lorem.word();
      const result = () => {
        parseObjectIdPipe.transform(mongoDbId);
      };
      expect(result).toThrow(BadRequestException);
      expect(result).toThrow(`Invalid ObjectId ${mongoDbId}`);
    });

    it('should throw a bad request exception if the mongo db id is empty', () => {
      const mongoDbId = '';
      const result = () => {
        parseObjectIdPipe.transform(mongoDbId);
      };
      expect(result).toThrow(BadRequestException);
      expect(result).toThrow(`Invalid ObjectId ${mongoDbId}`);
    });
  });
});
