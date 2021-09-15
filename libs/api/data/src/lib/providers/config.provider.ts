import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from '@dark-rush-photography/api/types';
import { MediaState } from '@dark-rush-photography/shared/types';

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

  get googleDriveSharedWatermarkedFolderId(): string {
    const value = this.configService.get(
      'googleDriveSharedWatermarkedFolderId',
      {
        infer: true,
      }
    );
    if (!value) {
      throw new BadRequestException(
        'googleDriveSharedWatermarkedFolderId undefined'
      );
    }
    return value;
  }

  get googleDriveSharedWithoutWatermarkFolderId(): string {
    const value = this.configService.get(
      'googleDriveSharedWithoutWatermarkFolderId',
      {
        infer: true,
      }
    );
    if (!value) {
      throw new BadRequestException(
        'googleDriveSharedWithoutWatermarkFolderId undefined'
      );
    }
    return value;
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

  get googleDriveDarkRushPhotographyFolderId(): string {
    const value = this.configService.get(
      'googleDriveDarkRushPhotographyFolderId',
      {
        infer: true,
      }
    );
    if (!value) {
      throw new BadRequestException(
        'googleDriveDarkRushPhotographyFolderId undefined'
      );
    }
    return value;
  }

  get entityPushNotificationsAddress(): string {
    const value = this.configService.get('entityPushNotificationsAddress', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('entityPushNotificationsAddress undefined');
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

  getAzureStorageConnectionString(state: MediaState): string {
    switch (state) {
      case MediaState.New:
      case MediaState.Selected:
        return this.azureStorageConnectionStringPrivate;
      case MediaState.Published:
      case MediaState.Archived:
        return this.azureStorageConnectionStringPublic;
      default:
        throw new BadRequestException(
          `Azure storage connection string not found for media state ${state}`
        );
    }
  }

  get azureStorageConnectionStringPrivate(): string {
    const value = this.configService.get(
      'azureStorageConnectionStringPrivate',
      {
        infer: true,
      }
    );
    if (!value) {
      throw new BadRequestException(
        'azureStorageConnectionStringPrivate undefined'
      );
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

  getAzureStorageBlobContainerName(state: MediaState): string {
    switch (state) {
      case MediaState.New:
      case MediaState.Selected:
        return this.azureStorageBlobContainerNamePrivate;
      case MediaState.Published:
      case MediaState.Archived:
        return this.azureStorageBlobContainerNamePublic;
      default:
        throw new BadRequestException(
          `Azure storage blob container name not found for media state ${state}`
        );
    }
  }

  get azureStorageBlobContainerNamePrivate(): string {
    const value = this.configService.get(
      'azureStorageBlobContainerNamePrivate',
      {
        infer: true,
      }
    );
    if (!value) {
      throw new BadRequestException(
        'azureStorageBlobContainerNamePrivate undefined'
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
