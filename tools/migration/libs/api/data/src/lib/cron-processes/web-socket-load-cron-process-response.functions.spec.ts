import * as faker from 'faker';

import {
  CronProcessType,
  DUMMY_MONGODB_ID,
} from '@dark-rush-photography/shared/types';
import { CronProcessTable } from '../tables/cron-process.table';
import { loadWebSocketCronProcessResponse } from './web-socket-load-cron-process-response.functions';

describe('web-socket-load-cron-process-response.functions', () => {
  describe('loadCronProcessResponse', () => {
    it('should load a cron process response with all values', () => {
      const key = faker.datatype.uuid();
      const type = faker.random.arrayElement(Object.values(CronProcessType));
      const typeString = type.toString();
      const entityId = DUMMY_MONGODB_ID;
      const ready = faker.datatype.boolean();
      const running = faker.datatype.boolean();
      const completed = faker.datatype.boolean();
      const error = faker.datatype.boolean();

      const result = loadWebSocketCronProcessResponse({
        key,
        type: typeString,
        entityId,
        ready,
        running,
        completed,
        error,
      } as CronProcessTable);

      expect(result.key).toBe(key);
      expect(result.type).toBe(type);
      expect(result.entityId).toBe(entityId);
      expect(result.ready).toBe(ready);
      expect(result.running).toBe(running);
      expect(result.completed).toBe(completed);
      expect(result.error).toBe(error);
    });
  });
});
