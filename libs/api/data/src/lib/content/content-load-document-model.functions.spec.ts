import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { loadAddImage } from './content-load-document-model.functions';

describe('content-load-document-model.functions', () => {
  describe('loadNewImageForEntity', () => {
    const entityId = DUMMY_MONGODB_ID;
    const storageId = faker.datatype.uuid();
    const fileName = faker.system.fileName();
    const state = faker.random.arrayElement(Object.values(ImageState));
    const order = faker.datatype.number();

    it('should load input values', () => {
      const result = loadAddImage(entityId, storageId, fileName, state, order);

      expect(result.entityId).toBe(entityId);
      expect(result.storageId).toBe(storageId);
      expect(result.fileName).toBe(fileName);
      expect(result.state).toBe(state);
      expect(result.order).toBe(order);
    });
  });
});
