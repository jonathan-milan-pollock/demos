import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from '@dark-rush-photography/api/types';

@Injectable()
export class ConfigProvider {
  constructor(private configService: ConfigService<Env>) {}

  get production(): boolean {
    return this.configService.get('production') === 'true';
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

  get privateBlobConnectionString(): string {
    const value = this.configService.get('privateBlobConnectionString', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('privateBlobConnectionString undefined');
    }
    return value;
  }

  get privateTableConnectionString(): string {
    const value = this.configService.get('privateTableConnectionString', {
      infer: true,
    });
    if (!value) {
      throw new BadRequestException('privateTableConnectionString undefined');
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
    const value = this.configService.get('ayrshareApiKey', { infer: true });
    if (!value) {
      throw new BadRequestException('ayrshareApiKey undefined');
    }
    return value;
  }
}
