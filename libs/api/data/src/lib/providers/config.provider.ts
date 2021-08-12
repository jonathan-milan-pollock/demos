import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  ImageDimensionType,
  MediaState,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';
import {
  Env,
  ImageArtistExif,
  ImageResolution,
  VideoArtistExif,
  VideoResolution,
} from '@dark-rush-photography/api/types';

@Injectable()
export class ConfigProvider {
  constructor(private configService: ConfigService<Env>) {}

  get production(): boolean {
    return this.configService.get('production') === 'true';
  }

  get dropboxOwnerEmail(): string {
    const value = this.configService.get('dropboxOwnerEmail', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('dropboxOwnerEmail undefined');
    }
    return value;
  }

  get websitesDropboxClientId(): string {
    const value = this.configService.get('websitesDropboxClientId', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('websitesDropboxClientId undefined');
    }
    return value;
  }

  get websitesDropboxClientSecret(): string {
    const value = this.configService.get('websitesDropboxClientSecret', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('websitesDropboxClientSecret undefined');
    }
    return value;
  }

  get clientsDropboxClientId(): string {
    const value = this.configService.get('clientsDropboxClientId', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('clientsDropboxClientId undefined');
    }
    return value;
  }

  get clientsDropboxClientSecret(): string {
    const value = this.configService.get('clientsDropboxClientSecret', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('clientsDropboxClientSecret undefined');
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

  getConnectionStringFromMediaState(mediaState: MediaState): string {
    switch (mediaState) {
      case MediaState.New:
      case MediaState.Selected:
        return this.privateBlobConnectionString;
      case MediaState.Public:
      case MediaState.Archived:
        return this.publicBlobConnectionString;
    }
  }

  get privateBlobConnectionString(): string {
    const value = this.configService.get('privateBlobConnectionString', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('privateBlobConnectionString undefined');
    }
    return value;
  }

  get publicBlobConnectionString(): string {
    const value = this.configService.get('publicBlobConnectionString', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('publicBlobConnectionString undefined');
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

  get logzioToken(): string {
    const value = this.configService.get('logzioToken', { infer: true });
    if (!value) {
      throw new BadRequestException('logzioToken undefined');
    }
    return value;
  }

  getWebsitesDropboxRedirectUri(protocol: string, host?: string): string {
    const fn = this.configService.get('getWebsitesDropboxRedirectUri', {
      infer: true,
    });
    if (!fn) {
      throw new BadRequestException('getWebsitesDropboxRedirectUri undefined');
    }
    return fn(protocol, host);
  }

  getClientsDropboxRedirectUri(protocol: string, host?: string): string {
    const fn = this.configService.get('getClientsDropboxRedirectUri', {
      infer: true,
    });
    if (!fn) {
      throw new BadRequestException('getClientsDropboxRedirectUri undefined');
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

  findImageVideoResolution(
    imageDimensionType: ImageDimensionType
  ): ImageResolution {
    const fn = this.configService.get('findImageVideoResolution', {
      infer: true,
    });
    if (!fn) {
      throw new BadRequestException('findImageVideoResolution undefined');
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
