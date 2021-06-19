import { HttpService, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable, of } from 'rxjs';

import { ENV, Media } from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  MediaProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminMediaService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly mediaModel: Model<DocumentModel>,
    private readonly mediaProvider: MediaProvider
  ) {}

  postMobileImage$(entityId: string): Observable<Media> {
    return of();
  }

  createPng$(entityId: string): Observable<Media> {
    return of();
  }

  createAppleIcon$(entityId: string): Observable<Media> {
    return of();
  }

  createAppleResource$(entityId: string): Observable<Media> {
    return of();
  }
}
