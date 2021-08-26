import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  ImageDimensionType,
  ImageResolution,
  MediaState,
  VideoDimensionType,
  VideoResolution,
} from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/serverless/types';

@Injectable()
export class ConfigProvider {
  constructor(private configService: ConfigService<Env>) {}

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

  get googleDriveClientsFolderId(): string {
    const value = this.configService.get('googleDriveClientsFolderId', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('googleDriveClientsFolderId undefined');
    }
    return value;
  }

  get googleDriveWebsitesFolderId(): string {
    const value = this.configService.get('googleDriveWebsitesFolderId', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('googleDriveWebsitesFolderId undefined');
    }
    return value;
  }

  get dropboxEmail(): string {
    const value = this.configService.get('dropboxEmail', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('dropboxEmail undefined');
    }
    return value;
  }

  get dropboxClientId(): string {
    const value = this.configService.get('dropboxClientId', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('dropboxClientId undefined');
    }
    return value;
  }

  get dropboxClientSecret(): string {
    const value = this.configService.get('dropboxClientSecret', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('dropboxClientSecret undefined');
    }
    return value;
  }

  getConnectionStringFromMediaState(mediaState: MediaState): string {
    switch (mediaState) {
      case MediaState.New:
      case MediaState.Selected:
        return this.privateAzureStorageConnectionString;
      case MediaState.Public:
      case MediaState.Archived:
        return this.publicAzureStorageConnectionString;
    }
  }

  get privateAzureStorageConnectionString(): string {
    const value = this.configService.get(
      'privateAzureStorageConnectionString',
      {
        infer: true,
      }
    );
    if (!value) {
      throw new BadRequestException(
        'privateAzureStorageConnectionString undefined'
      );
    }
    return value;
  }

  get publicAzureStorageConnectionString(): string {
    const value = this.configService.get('publicAzureStorageConnectionString', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException(
        'publicAzureStorageConnectionString undefined'
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

  findImageResolution(imageDimensionType: ImageDimensionType): ImageResolution {
    const fn = this.configService.get('findImageResolution', { infer: true });
    if (!fn) {
      throw new BadRequestException('findImageResolution undefined');
    }
    return fn(imageDimensionType);
  }

  findThreeSixtyImageResolution(
    imageDimensionType: ImageDimensionType
  ): ImageResolution {
    const fn = this.configService.get('findThreeSixtyImageResolution', {
      infer: true,
    });
    if (!fn) {
      throw new BadRequestException('findThreeSixtyImageResolution undefined');
    }
    return fn(imageDimensionType);
  }

  findVideoResolution(videoDimensionType: VideoDimensionType): VideoResolution {
    const fn = this.configService.get('findVideoResolution', { infer: true });
    if (!fn) {
      throw new BadRequestException('findVideoResolution undefined');
    }
    return fn(videoDimensionType);
  }

  findThreeSixtyVideoResolution(
    videoDimensionType: VideoDimensionType
  ): VideoResolution {
    const fn = this.configService.get('findThreeSixtyVideoResolution', {
      infer: true,
    });
    if (!fn) {
      throw new BadRequestException('findThreeSixtyVideoResolution undefined');
    }
    return fn(videoDimensionType);
  }
}
