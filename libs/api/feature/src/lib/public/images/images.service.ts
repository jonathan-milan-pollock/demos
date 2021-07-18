import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import { ImageDto } from '@dark-rush-photography/shared/types';
import {
  Document,
  DocumentModel,
  ImageProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageProvider: ImageProvider
  ) {}

  findOne$(id: string, entityId: string): Observable<ImageDto> {
    return this.imageProvider.findOnePublic$(id, entityId, this.entityModel);
  }
}
