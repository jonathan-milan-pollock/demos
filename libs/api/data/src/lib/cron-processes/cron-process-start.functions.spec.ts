import faker from '@faker-js/faker';

import {
  CronProcessType,
  DUMMY_MONGODB_ID,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { startCronProcessType } from './cron-process-start.functions';

jest.mock('./cron-process-state.functions', () => ({
  ...jest.requireActual('./cron-process-state.functions'),
}));
import * as cronProcessStateFunctions from './cron-process-state.functions';

describe('cron-process-start.functions', () => {
  describe('startCronProcessType', () => {
    it('should load a start cron process type', () => {
      const mockedSetCronProcessReady = jest
        .spyOn(cronProcessStateFunctions, 'setCronProcessReady')
        .mockReturnValue(undefined);

      const type = faker.random.arrayElement(Object.values(CronProcessType));
      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const entityId = DUMMY_MONGODB_ID;
      const group = faker.lorem.word();
      const slug = faker.lorem.word();
      const postSocialMedia = faker.datatype.boolean();

      const cronProcessTable = startCronProcessType(
        type,
        entityType,
        entityId,
        group,
        slug,
        postSocialMedia
      );

      expect(mockedSetCronProcessReady).toBeCalledTimes(1);
      expect(cronProcessTable.type).toBe(type);
      expect(cronProcessTable.entityType).toBe(entityType);
      expect(cronProcessTable.entityId).toBe(entityId);
      expect(cronProcessTable.group).toBe(group);
      expect(cronProcessTable.slug).toBe(slug);
      expect(cronProcessTable.postSocialMedia).toBe(postSocialMedia);
    });
  });
});
