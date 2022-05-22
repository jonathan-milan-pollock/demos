import { ConflictException } from '@nestjs/common';

import * as faker from 'faker';

import { loadEnvironment } from './env.functions';

describe('env.functions', () => {
  describe('loadEnvironment', () => {
    const PRODUCTION = faker.datatype.boolean();
    const GOOGLE_DRIVE_CLIENT_EMAIL = faker.lorem.word();
    const GOOGLE_DRIVE_PRIVATE_KEY = faker.lorem.word();
    const GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID = faker.lorem.word();
    const GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID =
      faker.lorem.word();
    const MONGO_DB_CONNECTION_STRING = faker.lorem.word();
    const AZURE_STORAGE_CONNECTION_STRING = faker.lorem.word();
    const AZURE_STORAGE_CONNECTION_STRING_PUBLIC = faker.lorem.word();
    const AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC = faker.lorem.word();
    const TINY_PNG_API_KEY = faker.lorem.word();
    const AYRSHARE_API_KEY = faker.lorem.word();

    it('should load environment when all values provided', () => {
      const result = loadEnvironment(
        PRODUCTION,
        GOOGLE_DRIVE_CLIENT_EMAIL,
        GOOGLE_DRIVE_PRIVATE_KEY,
        GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID,
        GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID,
        MONGO_DB_CONNECTION_STRING,
        AZURE_STORAGE_CONNECTION_STRING,
        AZURE_STORAGE_CONNECTION_STRING_PUBLIC,
        AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC,
        TINY_PNG_API_KEY,
        AYRSHARE_API_KEY
      );

      expect(result.production).toBe(PRODUCTION);
      expect(result.googleDriveClientEmail).toBe(GOOGLE_DRIVE_CLIENT_EMAIL);
      expect(result.googleDrivePrivateKey).toBe(GOOGLE_DRIVE_PRIVATE_KEY);
      expect(result.googleDriveWebsitesWatermarkedFolderId).toBe(
        GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID
      );
      expect(result.googleDriveWebsitesWithoutWatermarkFolderId).toBe(
        GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID
      );
      expect(result.mongoDbConnectionString).toBe(MONGO_DB_CONNECTION_STRING);
      expect(result.azureStorageConnectionStringPublic).toBe(
        AZURE_STORAGE_CONNECTION_STRING_PUBLIC
      );
      expect(result.azureStorageBlobContainerNamePublic).toBe(
        AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC
      );
      expect(result.tinyPngApiKey).toBe(TINY_PNG_API_KEY);
      expect(result.ayrshareApiKey).toBe(AYRSHARE_API_KEY);
    });

    it('should throw a conflict exception when google drive client email is undefined', () => {
      const result = () => {
        loadEnvironment(
          PRODUCTION,
          undefined,
          GOOGLE_DRIVE_PRIVATE_KEY,
          GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID,
          GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID,
          MONGO_DB_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING_PUBLIC,
          AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC,
          TINY_PNG_API_KEY,
          AYRSHARE_API_KEY
        );
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        'Please add NX_GOOGLE_DRIVE_CLIENT_EMAIL to environment variables'
      );
    });

    it('should throw a conflict exception when google drive private key is undefined', () => {
      const result = () => {
        loadEnvironment(
          PRODUCTION,
          GOOGLE_DRIVE_CLIENT_EMAIL,
          undefined,
          GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID,
          GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID,
          MONGO_DB_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING_PUBLIC,
          AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC,
          TINY_PNG_API_KEY,
          AYRSHARE_API_KEY
        );
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        'Please add NX_GOOGLE_DRIVE_PRIVATE_KEY to environment variables'
      );
    });

    it('should throw a conflict exception when google drive websites watermarked folder id is undefined', () => {
      const result = () => {
        loadEnvironment(
          PRODUCTION,
          GOOGLE_DRIVE_CLIENT_EMAIL,
          GOOGLE_DRIVE_PRIVATE_KEY,
          undefined,
          GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID,
          MONGO_DB_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING_PUBLIC,
          AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC,
          TINY_PNG_API_KEY,
          AYRSHARE_API_KEY
        );
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        'Please add NX_GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID to environment variables'
      );
    });

    it('should throw a conflict exception when google drive websites without watermark folder id is undefined', () => {
      const result = () => {
        loadEnvironment(
          PRODUCTION,
          GOOGLE_DRIVE_CLIENT_EMAIL,
          GOOGLE_DRIVE_PRIVATE_KEY,
          GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID,
          undefined,
          MONGO_DB_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING_PUBLIC,
          AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC,
          TINY_PNG_API_KEY,
          AYRSHARE_API_KEY
        );
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        'Please add NX_GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID to environment variables'
      );
    });

    it('should throw a conflict exception when mongo db connection string is undefined', () => {
      const result = () => {
        loadEnvironment(
          PRODUCTION,
          GOOGLE_DRIVE_CLIENT_EMAIL,
          GOOGLE_DRIVE_PRIVATE_KEY,
          GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID,
          GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID,
          undefined,
          AZURE_STORAGE_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING_PUBLIC,
          AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC,
          TINY_PNG_API_KEY,
          AYRSHARE_API_KEY
        );
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        'Please add NX_MONGO_DB_CONNECTION_STRING to environment variables'
      );
    });

    it('should throw a conflict exception when azure storage connection string is undefined', () => {
      const result = () => {
        loadEnvironment(
          PRODUCTION,
          GOOGLE_DRIVE_CLIENT_EMAIL,
          GOOGLE_DRIVE_PRIVATE_KEY,
          GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID,
          GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID,
          MONGO_DB_CONNECTION_STRING,
          undefined,
          AZURE_STORAGE_CONNECTION_STRING_PUBLIC,
          AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC,
          TINY_PNG_API_KEY,
          AYRSHARE_API_KEY
        );
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        'Please add AZURE_STORAGE_CONNECTION_STRING to environment variables'
      );
    });

    it('should throw a conflict exception when azure storage connection string public is undefined', () => {
      const result = () => {
        loadEnvironment(
          PRODUCTION,
          GOOGLE_DRIVE_CLIENT_EMAIL,
          GOOGLE_DRIVE_PRIVATE_KEY,
          GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID,
          GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID,
          MONGO_DB_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING,
          undefined,
          AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC,
          TINY_PNG_API_KEY,
          AYRSHARE_API_KEY
        );
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        'Please add AZURE_STORAGE_CONNECTION_STRING_PUBLIC to environment variables'
      );
    });

    it('should throw a conflict exception when azure storage container name public is undefined', () => {
      const result = () => {
        loadEnvironment(
          PRODUCTION,
          GOOGLE_DRIVE_CLIENT_EMAIL,
          GOOGLE_DRIVE_PRIVATE_KEY,
          GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID,
          GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID,
          MONGO_DB_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING_PUBLIC,
          undefined,
          TINY_PNG_API_KEY,
          AYRSHARE_API_KEY
        );
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        'Please add AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC to environment variables'
      );
    });

    it('should throw a conflict exception when tiny png api key is undefined', () => {
      const result = () => {
        loadEnvironment(
          PRODUCTION,
          GOOGLE_DRIVE_CLIENT_EMAIL,
          GOOGLE_DRIVE_PRIVATE_KEY,
          GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID,
          GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID,
          MONGO_DB_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING_PUBLIC,
          AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC,
          undefined,
          AYRSHARE_API_KEY
        );
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        'Please add NX_TINY_PNG_API_KEY to environment variables'
      );
    });

    it('should throw a conflict exception when ayrshare api key is undefined', () => {
      const result = () => {
        loadEnvironment(
          PRODUCTION,
          GOOGLE_DRIVE_CLIENT_EMAIL,
          GOOGLE_DRIVE_PRIVATE_KEY,
          GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID,
          GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID,
          MONGO_DB_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING,
          AZURE_STORAGE_CONNECTION_STRING_PUBLIC,
          AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC,
          TINY_PNG_API_KEY,
          undefined
        );
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        'Please add NX_AYRSHARE_API_KEY to environment variables'
      );
    });
  });
});
