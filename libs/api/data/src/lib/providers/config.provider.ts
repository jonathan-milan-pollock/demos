import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from '@dark-rush-photography/api/types';
import { WatermarkedType } from '@dark-rush-photography/shared/types';

@Injectable()
export class ConfigProvider {
  constructor(private readonly configService: ConfigService<Env>) {}

  get production(): boolean {
    return this.configService.get('production') === 'true';
  }

  get googleDriveClientEmail(): string {
    const value = this.configService.get('googleDriveClientEmail', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('googleDriveClientEmail undefined');
    }
    return value;
  }

  get googleDrivePrivateKey(): string {
    const value = this.configService.get('googleDrivePrivateKey', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('googleDrivePrivateKey undefined');
    }
    return value;
  }

  getGoogleDriveWebsitesFolderId(watermarkedType: WatermarkedType): string {
    switch (watermarkedType) {
      case WatermarkedType.Watermarked:
        return this.googleDriveWebsitesWatermarkedFolderId;
      case WatermarkedType.WithoutWatermark:
        return this.googleDriveWebsitesWithoutWatermarkFolderId;
      default:
        throw new BadRequestException(
          `Google Drive websites folder id not found for watermarked type ${watermarkedType}`
        );
    }
  }

  get googleDriveWebsitesWatermarkedFolderId(): string {
    const value = this.configService.get(
      'googleDriveWebsitesWatermarkedFolderId',
      {
        infer: true,
      }
    );
    if (!value) {
      throw new BadRequestException(
        'googleDriveWebsitesWatermarkedFolderId undefined'
      );
    }
    return value;
  }

  get googleDriveWebsitesWithoutWatermarkFolderId(): string {
    const value = this.configService.get(
      'googleDriveWebsitesWithoutWatermarkFolderId',
      {
        infer: true,
      }
    );
    if (!value) {
      throw new BadRequestException(
        'googleDriveWebsitesWithoutWatermarkFolderId undefined'
      );
    }
    return value;
  }

  get mongoDbConnectionString(): string {
    const value = this.configService.get('mongoDbConnectionString', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('mongoDbConnectionString undefined');
    }
    return value;
  }

  get azureStorageConnectionStringPublic(): string {
    const value = this.configService.get('azureStorageConnectionStringPublic', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException(
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
      throw new BadRequestException(
        'azureStorageBlobContainerNamePublic undefined'
      );
    }
    return value;
  }

  get tinyPngApiKey(): string {
    const value = this.configService.get('tinyPngApiKey', { infer: true });
    if (!value) {
      throw new BadRequestException('tinyPngApiKey undefined');
    }
    return value;
  }

  get ayrshareApiKey(): string {
    const value = this.configService.get('ayrshareApiKey', { infer: true });
    if (!value) {
      throw new BadRequestException('ayrshareApiKey undefined');
    }
    return value;
  }
}
