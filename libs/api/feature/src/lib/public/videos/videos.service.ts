import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import { VideoDto } from '@dark-rush-photography/shared/types';
import {
  Document,
  DocumentModel,
  VideoProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly videoProvider: VideoProvider
  ) {}

  findOne$(id: string, entityId: string): Observable<VideoDto> {
    return this.videoProvider.findOnePublic$(id, entityId, this.entityModel);
  }
}
