import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from '@dark-rush-photography/api/types';
import { WatermarkedType } from '@dark-rush-photography/shared/types';

@Injectable()
export class ConfigProvider {
  constructor(private readonly configService: ConfigService<Env>) {}

  get production(): boolean {
    return this.configService.get('production') === true;
  }

  get googleDriveClientEmail(): string {
    const value = this.configService.get('googleDriveClientEmail', {
      infer: true,
    });
    if (!value) {
      throw new ConflictException('googleDriveClientEmail undefined');
    }
    return value;
  }

  get googleDrivePrivateKey(): string {
    const value = this.configService.get('googleDrivePrivateKey', {
      infer: true,
    });
    if (!value) {
      throw new ConflictException('googleDrivePrivateKey undefined');
    }
    return value;
  }

  getGoogleDriveWebsitesFolderId(watermarkedType: WatermarkedType): string {
    const googleDriveWebsitesWatermarkedFolderId = this.configService.get(
      'googleDriveWebsitesWatermarkedFolderId',
      {
        infer: true,
      }
    );

    const googleDriveWebsitesWithoutWatermarkFolderId = this.configService.get(
      'googleDriveWebsitesWithoutWatermarkFolderId',
      {
        infer: true,
      }
    );

    if (!googleDriveWebsitesWatermarkedFolderId) {
      throw new ConflictException(
        'googleDriveWebsitesWatermarkedFolderId undefined'
      );
    }
    if (!googleDriveWebsitesWithoutWatermarkFolderId) {
      throw new ConflictException(
        'googleDriveWebsitesWithoutWatermarkFolderId undefined'
      );
    }

    switch (watermarkedType) {
      case WatermarkedType.Watermarked:
        return googleDriveWebsitesWatermarkedFolderId;
      case WatermarkedType.WithoutWatermark:
        return googleDriveWebsitesWithoutWatermarkFolderId;
      default:
        throw new ConflictException(
          `Google Drive websites folder id not found for watermarked type ${watermarkedType}`
        );
    }
  }

  get mongoDbConnectionString(): string {
    const value = this.configService.get('mongoDbConnectionString', {
      infer: true,
    });
    if (!value) {
      throw new ConflictException('mongoDbConnectionString undefined');
    }
    return value;
  }

  get azureStorageConnectionStringPublic(): string {
    const value = this.configService.get('azureStorageConnectionStringPublic', {
      infer: true,
    });
    if (!value) {
      throw new ConflictException(
        'azureStorageConnectionStringPublic undefined'
      );
    }
    return value;
  }

  get azureStorageBlobContainerNamePublic(): string {
    const value = this.configService.get(
      'azureStorageBlobContainerNamePublic',
      {
        infer: true,
      }
    );
    if (!value) {
      throw new ConflictException(
        'azureStorageBlobContainerNamePublic undefined'
      );
    }
    return value;
  }

  get tinyPngApiKey(): string {
    const value = this.configService.get('tinyPngApiKey', { infer: true });
    if (!value) {
      throw new ConflictException('tinyPngApiKey undefined');
    }
    return value;
  }

  get ayrshareApiKey(): string {
    const value = this.configService.get('ayrshareApiKey', { infer: true });
    if (!value) {
      throw new ConflictException('ayrshareApiKey undefined');
    }
    return value;
  }
}
