import { BadRequestException } from '@nestjs/common';

import * as faker from 'faker';

import { EntityType } from '@dark-rush-photography/shared/types';
import { validateEntityDoesNotRequireGroup } from './entity-group-validation.functions';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

describe('entity-group-validation.functions', () => {
  describe('validateEntityDoesNotRequireGroup', () => {
    it('should not throw exception if entity does not require a group', () => {
      jest.spyOn(apiUtil, 'getEntityHasGroup').mockImplementation(() => false);

      expect(() =>
        validateEntityDoesNotRequireGroup(
          faker.random.arrayElement(Object.values(EntityType))
        )
      ).not.toThrow();
    });

    it('should throw exception if entity requires a group', () => {
      jest.spyOn(apiUtil, 'getEntityHasGroup').mockImplementation(() => true);

      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const result = () => {
        validateEntityDoesNotRequireGroup(entityType);
      };
      expect(result).toThrow(BadRequestException);
      expect(result).toThrow(`Entity type ${entityType} requires a group`);
    });
  });
});
