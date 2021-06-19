import { Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { VideoDimension } from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { toVideoDimension } from '../functions/video-dimension.functions';

@Injectable()
export class VideoDimensionProvider {
  findById$(
    documentModel: Model<DocumentModel>,
    entityId: string,
    videoDimensionId: string
  ): Observable<VideoDimension> {
    return from(documentModel.findById(entityId).exec()).pipe(
      map((response) => {
        if (!response) throw new NotFoundException('Could not find entity');

        const foundVideoDimension = response.videoDimensions.find(
          (id) => id.id === videoDimensionId
        );
        if (!foundVideoDimension)
          throw new NotFoundException('Could not find video dimension by id');

        return toVideoDimension(foundVideoDimension);
      })
    );
  }
}
