import { Logger } from '@nestjs/common';

import * as faker from 'faker';

import {
  DEFAULT_ENTITY_GROUP,
  EntityType,
} from '@dark-rush-photography/shared/types';
import {
  logFoundEntityMessage,
  logCreatingEntityMessage,
} from './log-messages.functions';

describe('log-messages.functions', () => {
  describe('logCreatingEntityMessage', () => {
    it('should log a creating entity message for a group and folder name', () => {
      const mockedLogger = {
        log: jest.fn().mockReturnValue(undefined),
      };

      const folderName = faker.lorem.word();
      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const group = faker.lorem.word();

      logCreatingEntityMessage(
        mockedLogger as unknown as Logger,
        folderName,
        entityType,
        group
      );

      expect(mockedLogger.log).toBeCalledTimes(1);
      const [logMessage] = mockedLogger.log.mock.calls[0];
      expect(logMessage).toBe(
        `Creating ${entityType} entity ${group} ${folderName}`
      );
    });

    it('should log a creating entity message for a default entity group and entity folder name', () => {
      const mockedLogger = {
        log: jest.fn().mockReturnValue(undefined),
      };

      const folderName = faker.lorem.word();
      const entityType = faker.random.arrayElement(Object.values(EntityType));

      logCreatingEntityMessage(
        mockedLogger as unknown as Logger,
        folderName,
        entityType,
        DEFAULT_ENTITY_GROUP
      );

      expect(mockedLogger.log).toBeCalledTimes(1);
      const [logMessage] = mockedLogger.log.mock.calls[0];
      expect(logMessage).toBe(`Creating ${entityType} entity ${folderName}`);
    });

    it('should log a creating entity message for a group and slug', () => {
      const mockedLogger = {
        log: jest.fn().mockReturnValue(undefined),
      };

      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const slug = faker.lorem.word();

      logCreatingEntityMessage(
        mockedLogger as unknown as Logger,
        faker.lorem.word(),
        entityType,
        DEFAULT_ENTITY_GROUP,
        slug
      );

      expect(mockedLogger.log).toBeCalledTimes(1);
      const [logMessage] = mockedLogger.log.mock.calls[0];
      expect(logMessage).toBe(`Creating ${entityType} entity ${slug}`);
    });

    it('should log a creating entity message for a default entity group and slug', () => {
      const mockedLogger = {
        log: jest.fn().mockReturnValue(undefined),
      };

      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const group = faker.lorem.word();
      const slug = faker.lorem.word();

      logCreatingEntityMessage(
        mockedLogger as unknown as Logger,
        faker.lorem.word(),
        entityType,
        group,
        slug
      );

      expect(mockedLogger.log).toBeCalledTimes(1);
      const [logMessage] = mockedLogger.log.mock.calls[0];
      expect(logMessage).toBe(`Creating ${entityType} entity ${group} ${slug}`);
    });
  });

  describe('logFoundEntityMessage', () => {
    it('should log a found entity message for a group and folder name', () => {
      const mockedLogger = {
        log: jest.fn().mockReturnValue(undefined),
      };

      const folderName = faker.lorem.word();
      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const group = faker.lorem.word();

      logFoundEntityMessage(
        mockedLogger as unknown as Logger,
        folderName,
        entityType,
        group
      );

      expect(mockedLogger.log).toBeCalledTimes(1);
      const [logMessage] = mockedLogger.log.mock.calls[0];
      expect(logMessage).toBe(
        `Found ${entityType} entity ${group} ${folderName}`
      );
    });

    it('should log a found entity message for a default entity group and entity folder name', () => {
      const mockedLogger = {
        log: jest.fn().mockReturnValue(undefined),
      };

      const folderName = faker.lorem.word();
      const entityType = faker.random.arrayElement(Object.values(EntityType));

      logFoundEntityMessage(
        mockedLogger as unknown as Logger,
        folderName,
        entityType,
        DEFAULT_ENTITY_GROUP
      );

      expect(mockedLogger.log).toBeCalledTimes(1);
      const [logMessage] = mockedLogger.log.mock.calls[0];
      expect(logMessage).toBe(`Found ${entityType} entity ${folderName}`);
    });

    it('should log a found entity message for a group and slug', () => {
      const mockedLogger = {
        log: jest.fn().mockReturnValue(undefined),
      };

      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const slug = faker.lorem.word();

      logFoundEntityMessage(
        mockedLogger as unknown as Logger,
        faker.lorem.word(),
        entityType,
        DEFAULT_ENTITY_GROUP,
        slug
      );

      expect(mockedLogger.log).toBeCalledTimes(1);
      const [logMessage] = mockedLogger.log.mock.calls[0];
      expect(logMessage).toBe(`Found ${entityType} entity ${slug}`);
    });

    it('should log a found entity message for a default entity group and slug', () => {
      const mockedLogger = {
        log: jest.fn().mockReturnValue(undefined),
      };

      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const group = faker.lorem.word();
      const slug = faker.lorem.word();

      logFoundEntityMessage(
        mockedLogger as unknown as Logger,
        faker.lorem.word(),
        entityType,
        group,
        slug
      );

      expect(mockedLogger.log).toBeCalledTimes(1);
      const [logMessage] = mockedLogger.log.mock.calls[0];
      expect(logMessage).toBe(`Found ${entityType} entity ${group} ${slug}`);
    });
  });
});
