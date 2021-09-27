/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import * as faker from 'faker';

import { ConfigProvider } from './config.provider';
import { WatermarkedType } from '@dark-rush-photography/shared/types';
import { ConflictException } from '@nestjs/common';

describe('config.provider', () => {
  const PRODUCTION = faker.datatype.boolean();
  const GOOGLE_DRIVE_CLIENT_EMAIL = faker.lorem.word();
  const GOOGLE_DRIVE_PRIVATE_KEY = faker.lorem.word();
  const GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID = faker.lorem.word();
  const GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID = faker.lorem.word();
  const MONGO_DB_CONNECTION_STRING = faker.lorem.word();
  const AZURE_STORAGE_CONNECTION_STRING_PUBLIC = faker.lorem.word();
  const AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC = faker.lorem.word();
  const TINY_PNG_API_KEY = faker.lorem.word();
  const AYRSHARE_API_KEY = faker.lorem.word();

  describe('properties', () => {
    let configProvider: ConfigProvider;
    describe('should get config value', () => {
      beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
          providers: [
            {
              provide: ConfigService,
              useValue: {
                get: jest.fn((key: string) => {
                  switch (key) {
                    case 'production':
                      return PRODUCTION;
                    case 'googleDriveClientEmail':
                      return GOOGLE_DRIVE_CLIENT_EMAIL;
                    case 'googleDrivePrivateKey':
                      return GOOGLE_DRIVE_PRIVATE_KEY;
                    case 'mongoDbConnectionString':
                      return MONGO_DB_CONNECTION_STRING;
                    case 'azureStorageConnectionStringPublic':
                      return AZURE_STORAGE_CONNECTION_STRING_PUBLIC;
                    case 'azureStorageBlobContainerNamePublic':
                      return AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC;
                    case 'tinyPngApiKey':
                      return TINY_PNG_API_KEY;
                    case 'ayrshareApiKey':
                      return AYRSHARE_API_KEY;
                    default:
                      return undefined;
                  }
                }),
              },
            },
            ConfigProvider,
          ],
        }).compile();

        configProvider = moduleRef.get<ConfigProvider>(ConfigProvider);
      });

      it('should get production config value', () => {
        const result = configProvider.production;
        expect(result).toBe(PRODUCTION);
      });

      it('should get google drive client email config value', () => {
        const result = configProvider.googleDriveClientEmail;
        expect(result).toBe(GOOGLE_DRIVE_CLIENT_EMAIL);
      });

      it('should get google drive private key config value', () => {
        const result = configProvider.googleDrivePrivateKey;
        expect(result).toBe(GOOGLE_DRIVE_PRIVATE_KEY);
      });

      it('should get mongo db connection string config value', () => {
        const result = configProvider.mongoDbConnectionString;
        expect(result).toBe(MONGO_DB_CONNECTION_STRING);
      });

      it('should get azure storage connection string public config value', () => {
        const result = configProvider.azureStorageConnectionStringPublic;
        expect(result).toBe(AZURE_STORAGE_CONNECTION_STRING_PUBLIC);
      });

      it('should get azure storage blob container name public config value', () => {
        const result = configProvider.azureStorageBlobContainerNamePublic;
        expect(result).toBe(AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC);
      });

      it('should get tiny png api key public config value', () => {
        const result = configProvider.tinyPngApiKey;
        expect(result).toBe(TINY_PNG_API_KEY);
      });

      it('should get ayrshare api key public config value', () => {
        const result = configProvider.ayrshareApiKey;
        expect(result).toBe(AYRSHARE_API_KEY);
      });
    });

    describe('should throw conflict exception', () => {
      beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
          providers: [
            {
              provide: ConfigService,
              useValue: {
                get: jest.fn(() => {
                  return undefined;
                }),
              },
            },
            ConfigProvider,
          ],
        }).compile();

        configProvider = moduleRef.get<ConfigProvider>(ConfigProvider);
      });

      it('should throw a conflict exception when google drive client email config value is undefined', () => {
        const result = () => configProvider.googleDriveClientEmail;
        expect(result).toThrow(ConflictException);
        expect(result).toThrow('googleDriveClientEmail undefined');
      });

      it('should throw a conflict exception when google drive private key config value is undefined', () => {
        const result = () => configProvider.googleDrivePrivateKey;
        expect(result).toThrow(ConflictException);
        expect(result).toThrow('googleDrivePrivateKey undefined');
      });

      it('should throw a conflict exception when mongo db connection string config value is undefined', () => {
        const result = () => configProvider.mongoDbConnectionString;
        expect(result).toThrow(ConflictException);
        expect(result).toThrow('mongoDbConnectionString undefined');
      });

      it('should throw a conflict exception when azure storage connection string public config value is undefined', () => {
        const result = () => configProvider.azureStorageConnectionStringPublic;
        expect(result).toThrow(ConflictException);
        expect(result).toThrow('azureStorageConnectionStringPublic undefined');
      });

      it('should throw a conflict exception when azure storage blob container name public config value is undefined', () => {
        const result = () => configProvider.azureStorageBlobContainerNamePublic;
        expect(result).toThrow(ConflictException);
        expect(result).toThrow('azureStorageBlobContainerNamePublic undefined');
      });

      it('should throw a conflict exception when tiny png api key public config value is undefined', () => {
        const result = () => configProvider.tinyPngApiKey;
        expect(result).toThrow(ConflictException);
        expect(result).toThrow('tinyPngApiKey undefined');
      });

      it('should throw a conflict exception when ayrshare api key public config value is undefined', () => {
        const result = () => configProvider.ayrshareApiKey;
        expect(result).toThrow(ConflictException);
        expect(result).toThrow('ayrshareApiKey undefined');
      });
    });
  });

  describe('getGoogleDriveWebsitesFolderId', () => {
    describe('should get config value', () => {
      let configProvider: ConfigProvider;

      beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
          providers: [
            {
              provide: ConfigService,
              useValue: {
                get: jest.fn((key: string) => {
                  switch (key) {
                    case 'googleDriveWebsitesWatermarkedFolderId':
                      return GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID;
                    case 'googleDriveWebsitesWithoutWatermarkFolderId':
                      return GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID;
                  }
                }),
              },
            },
            ConfigProvider,
          ],
        }).compile();

        configProvider = moduleRef.get<ConfigProvider>(ConfigProvider);
      });

      it('should get google drive websites watermarked folder id config value', () => {
        const result = configProvider.getGoogleDriveWebsitesFolderId(
          WatermarkedType.Watermarked
        );
        expect(result).toBe(GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID);
      });

      it('should get google drive websites without watermark folder id config value', () => {
        const result = configProvider.getGoogleDriveWebsitesFolderId(
          WatermarkedType.WithoutWatermark
        );
        expect(result).toBe(GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID);
      });
    });

    describe('should throw conflict exception', () => {
      it('should throw a conflict exception when google drive websites watermarked folder id config value is undefined', async () => {
        const moduleRef = await Test.createTestingModule({
          providers: [
            {
              provide: ConfigService,
              useValue: {
                get: jest.fn(() => {
                  return undefined;
                }),
              },
            },
            ConfigProvider,
          ],
        }).compile();

        const configProvider = moduleRef.get<ConfigProvider>(ConfigProvider);

        const result = () =>
          configProvider.getGoogleDriveWebsitesFolderId(
            WatermarkedType.Watermarked
          );
        expect(result).toThrow(ConflictException);
        expect(result).toThrow(
          'googleDriveWebsitesWatermarkedFolderId undefined'
        );
      });

      it('should throw a conflict exception when google drive websites without watermark folder id config value is undefined', async () => {
        const moduleRef = await Test.createTestingModule({
          providers: [
            {
              provide: ConfigService,
              useValue: {
                get: jest.fn((key: string) => {
                  switch (key) {
                    case 'googleDriveWebsitesWatermarkedFolderId':
                      return GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID;
                    default:
                      return undefined;
                  }
                }),
              },
            },
            ConfigProvider,
          ],
        }).compile();

        const configProvider = moduleRef.get<ConfigProvider>(ConfigProvider);

        const result = () =>
          configProvider.getGoogleDriveWebsitesFolderId(
            WatermarkedType.WithoutWatermark
          );
        expect(result).toThrow(ConflictException);
        expect(result).toThrow(
          'googleDriveWebsitesWithoutWatermarkFolderId undefined'
        );
      });

      it('should throw a conflict exception when invalid watermark type is provided', async () => {
        const moduleRef = await Test.createTestingModule({
          providers: [
            {
              provide: ConfigService,
              useValue: {
                get: jest.fn((key: string) => {
                  switch (key) {
                    case 'googleDriveWebsitesWatermarkedFolderId':
                      return GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID;
                    case 'googleDriveWebsitesWithoutWatermarkFolderId':
                      return GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID;
                  }
                }),
              },
            },
            ConfigProvider,
          ],
        }).compile();

        const configProvider = moduleRef.get<ConfigProvider>(ConfigProvider);

        const watermarkedType = faker.lorem.word() as WatermarkedType;
        const result = () =>
          configProvider.getGoogleDriveWebsitesFolderId(watermarkedType);
        expect(result).toThrow(ConflictException);
        expect(result).toThrow(
          `Google Drive websites folder id not found for watermarked type ${watermarkedType}`
        );
      });
    });
  });
});
