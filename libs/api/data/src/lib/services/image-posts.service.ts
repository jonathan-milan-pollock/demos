import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { CronProcessType } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { createImagePostEntity$ } from '../entities/entity-repository.functions';
import { startCronProcessType } from '../cron-processes/cron-process-start.functions';
import { ImageAddProvider } from '../providers/image-add.provider';
import { CronProcessRepositoryProvider } from '../providers/cron-process-repository.provider';

@Injectable()
export class ImagePostsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageAddProvider: ImageAddProvider,
    @Inject(CronProcessRepositoryProvider.name)
    private readonly cronProcessRepositoryProvider: CronProcessRepositoryProvider
  ) {}

  create$(text: string, file: Express.Multer.File): Observable<void> {
    return createImagePostEntity$(text, this.entityModel).pipe(
      concatMap((documentModel) =>
        this.imageAddProvider
          .addImagePostImage$(documentModel._id, file)
          .pipe(
            concatMap(() =>
              this.cronProcessRepositoryProvider.create$(
                startCronProcessType(
                  CronProcessType.PublishEntity,
                  documentModel.type,
                  documentModel._id,
                  documentModel.group,
                  documentModel.pathname,
                  true
                )
              )
            )
          )
      )
    );
  }
}
