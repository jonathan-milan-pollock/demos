import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { About, DocumentType } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  SocialMediaProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly aboutModel: Model<DocumentModel>,
    private readonly socialMediaProvider: SocialMediaProvider
  ) {}

  delete$(id: string): Observable<void> {
    return from(this.aboutModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
