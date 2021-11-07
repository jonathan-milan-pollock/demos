import * as faker from 'faker';

import {
  CronProcessType,
  DUMMY_MONGODB_ID,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { CronProcessTable } from '../tables/cron-process.table';
import {
  loadCronProcess,
  loadCronProcessUpdate,
} from './cron-process-load.functions';

describe('cron-process-load.functions', () => {
  describe('loadCronProcessUpdate', () => {
    it('should load a cron process update with new values', () => {
      const cronProcessTable: CronProcessTable = {
        key: faker.datatype.uuid(),
        type: faker.random
          .arrayElement(Object.values(CronProcessType))
          .toString(),
        entityType: faker.random
          .arrayElement(Object.values(EntityType))
          .toString(),
        entityId: DUMMY_MONGODB_ID,
        group: faker.lorem.word(),
        slug: faker.lorem.word(),
        postSocialMedia: faker.datatype.boolean(),
        ready: faker.datatype.boolean(),
        running: faker.datatype.boolean(),
        completed: faker.datatype.boolean(),
        error: faker.datatype.boolean(),
      };

      const cronProcessTableUpdate: CronProcessTable = {
        key: faker.datatype.uuid(),
        type: faker.random
          .arrayElement(Object.values(CronProcessType))
          .toString(),
        entityType: faker.random
          .arrayElement(Object.values(EntityType))
          .toString(),
        entityId: DUMMY_MONGODB_ID,
        group: faker.lorem.word(),
        slug: faker.lorem.word(),
        postSocialMedia: faker.datatype.boolean(),
        ready: faker.datatype.boolean(),
        running: faker.datatype.boolean(),
        completed: faker.datatype.boolean(),
        error: faker.datatype.boolean(),
      };

      const result = loadCronProcessUpdate(
        cronProcessTable,
        cronProcessTableUpdate
      );

      expect(result.key).toBe(cronProcessTableUpdate.key);
      expect(result.type).toBe(cronProcessTableUpdate.type);
      expect(result.entityType).toBe(cronProcessTableUpdate.entityType);
      expect(result.entityId).toBe(cronProcessTableUpdate.entityId);
      expect(result.group).toBe(cronProcessTableUpdate.group);
      expect(result.slug).toBe(cronProcessTableUpdate.slug);
      expect(result.postSocialMedia).toBe(
        cronProcessTableUpdate.postSocialMedia
      );
      expect(result.ready).toBe(cronProcessTableUpdate.ready);
      expect(result.running).toBe(cronProcessTableUpdate.running);
      expect(result.completed).toBe(cronProcessTableUpdate.completed);
      expect(result.error).toBe(cronProcessTableUpdate.error);
    });
  });

  describe('loadCronProcess', () => {
    it('should load a cron process with all values', () => {
      const key = faker.datatype.uuid();
      const type = faker.random.arrayElement(Object.values(CronProcessType));
      const typeString = type.toString();
      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const entityTypeString = entityType.toString();
      const entityId = DUMMY_MONGODB_ID;
      const group = faker.lorem.word();
      const slug = faker.lorem.word();
      const postSocialMedia = faker.datatype.boolean();
      const ready = faker.datatype.boolean();
      const running = faker.datatype.boolean();
      const completed = faker.datatype.boolean();
      const error = faker.datatype.boolean();

      const result = loadCronProcess({
        key,
        type: typeString,
        entityType: entityTypeString,
        entityId,
        group,
        slug,
        postSocialMedia,
        ready,
        running,
        completed,
        error,
      });

      expect(result.key).toBe(key);
      expect(result.type).toBe(type);
      expect(result.entityType).toBe(entityType);
      expect(result.entityId).toBe(entityId);
      expect(result.group).toBe(group);
      expect(result.slug).toBe(slug);
      expect(result.postSocialMedia).toBe(postSocialMedia);
      expect(result.ready).toBe(ready);
      expect(result.running).toBe(running);
      expect(result.completed).toBe(completed);
      expect(result.error).toBe(error);
    });
  });
});
