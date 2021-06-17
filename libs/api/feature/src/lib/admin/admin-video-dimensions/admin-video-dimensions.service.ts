import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { VideoDimension } from '@dark-rush-photography/shared-types';
import {
  Document,
  DocumentModel,
  VideoDimensionProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminVideoDimensionsService {
  constructor(
    @InjectModel(Document.name)
    private readonly documentModel: Model<DocumentModel>,
    private readonly videoDimensionProvider: VideoDimensionProvider
  ) {}

  addOrUpdate$(videoDimension: VideoDimension): Observable<VideoDimension> {
    return from(
      this.documentModel.findById(videoDimension.entityId).exec()
    ).pipe(
      switchMap((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find entity');

        const video = documentModel.videos.find(
          (i) => i.slug === videoDimension.videoSlug
        );

        if (!video)
          throw new NotFoundException(
            `Could not find video ${videoDimension.videoSlug}`
          );

        return from(
          this.documentModel.findByIdAndUpdate(video.entityId, {
            videoDimensions: [
              ...documentModel.videoDimensions.filter(
                (id) => id.videoSlug !== video.slug
              ),
              { ...videoDimension },
            ],
          })
        );
      }),
      map((response) => {
        if (!response) {
          throw new BadRequestException(
            `Unable to add video dimension to image ${videoDimension.videoSlug}`
          );
        }
        return this.videoDimensionProvider.toVideoDimension(videoDimension);
      })
    );
  }
}
