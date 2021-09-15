import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  DocumentModel,
  Document,
  EntityPublicProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class SitemapService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityPublicProvider: EntityPublicProvider
  ) {}

  loadSitemap$(): Observable<string> {
    return of('');
  }
}
