import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

import * as faker from 'faker';

import { IS_PUBLIC } from '@dark-rush-photography/shared/types';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('jwt-auth.guard', () => {
  let mockExecutionContext: ExecutionContext;

  beforeEach(async () => {
    mockExecutionContext = {
      getClass: jest.fn(),
    } as unknown as ExecutionContext;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('canActivate', () => {
    it('should return true when controller is public', async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          {
            provide: Reflector,
            useValue: {
              constructor: jest.fn(),
              get: jest.fn((key: string) => {
                switch (key) {
                  case IS_PUBLIC:
                    return true;
                }
              }),
            },
          },
          JwtAuthGuard,
        ],
      }).compile();

      const jwtAuthGuard = moduleRef.get<JwtAuthGuard>(JwtAuthGuard);

      const result = jwtAuthGuard.canActivate(mockExecutionContext);
      expect(result).toBe(true);
    });

    it('should return value of super can activate when controller is not public', async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          {
            provide: Reflector,
            useValue: {
              constructor: jest.fn(),
              get: jest.fn((key: string) => {
                switch (key) {
                  case IS_PUBLIC:
                    return false;
                }
              }),
            },
          },
          JwtAuthGuard,
        ],
      }).compile();

      const jwtAuthGuard = moduleRef.get<JwtAuthGuard>(JwtAuthGuard);

      const canActivate = faker.datatype.boolean();
      const mockedSuperCanActivate = jest
        .spyOn(JwtAuthGuard.prototype, 'canActivate')
        .mockReturnValue(canActivate);

      const result = jwtAuthGuard.canActivate(mockExecutionContext);
      expect(mockedSuperCanActivate).toHaveBeenCalled();
      expect(result).toBe(canActivate);
    });
  });
});
