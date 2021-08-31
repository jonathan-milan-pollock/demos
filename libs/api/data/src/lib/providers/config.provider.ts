import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  ImageDimensionType,
  ImageResolution,
  VideoDimensionType,
  VideoResolution,
} from '@dark-rush-photography/shared/types';
import {
  Env,
  ImageArtistExif,
  VideoArtistExif,
} from '@dark-rush-photography/api/types';

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

  get mongoDbConnectionString(): string {
    const value = this.configService.get('mongoDbConnectionString', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('mongoDbConnectionString undefined');
    }
    return value;
  }

  get azureStorageConnectionStringBlobs(): string {
    const value = this.configService.get('azureStorageConnectionStringBlobs', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException(
        'azureStorageConnectionStringBlobs undefined'
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

  getDropboxRedirectUri(protocol: string, host?: string): string {
    const fn = this.configService.get('getDropboxRedirectUri', {
      infer: true,
    });
    if (!fn) {
      throw new BadRequestException('getDropboxRedirectUri undefined');
    }
    return fn(protocol, host);
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

  getImageArtistExif(
    copyrightYear: number,
    exifDateCreated: string
  ): ImageArtistExif {
    const fn = this.configService.get('getImageArtistExif', { infer: true });
    if (!fn) {
      throw new BadRequestException('getImageArtistExif undefined');
    }
    return fn(copyrightYear, exifDateCreated);
  }

  getVideoArtistExif(copyrightYear: number): VideoArtistExif {
    const fn = this.configService.get('getVideoArtistExif', { infer: true });
    if (!fn) {
      throw new BadRequestException('getVideoArtistExif undefined');
    }
    return fn(copyrightYear);
  }
}
