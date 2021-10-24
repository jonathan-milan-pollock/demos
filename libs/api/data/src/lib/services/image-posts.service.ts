import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { Document, DocumentModel } from '../schema/document.schema';
import { createImagePostEntity$ } from '../entities/entity-repository.functions';
import { ImageAddProvider } from '../providers/image-add.provider';
import { CronProcessStartProvider } from '../providers/cron-process-start.provider';

@Injectable()
export class ImagePostsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageAddProvider: ImageAddProvider,
    private readonly cronProcessStartProvider: CronProcessStartProvider
  ) {}

  create$(text: string, file: Express.Multer.File): Observable<void> {
    return createImagePostEntity$(text, this.entityModel).pipe(
      concatMap((documentModel) =>
        this.imageAddProvider
          .addImagePostImage$(documentModel._id, file)
          .pipe(
            concatMap(() =>
              this.cronProcessStartProvider.startPublishEntity$(
                documentModel.type,
                documentModel._id,
                documentModel.group,
                documentModel.slug,
                true
              )
            )
          )
      ),
      map(() => undefined)
    );
  }
}
