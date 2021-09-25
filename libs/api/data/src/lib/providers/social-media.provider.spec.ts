import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { Document } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { SocialMediaProvider } from './social-media.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

describe('social-media.provider', () => {
  let socialMediaProvider: SocialMediaProvider;
});
