import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { concatMapTo, from, map, Observable, toArray } from 'rxjs';

import {
  MediaProcess,
  MediaProcessCreateDto,
  MediaProcessType,
  MediaProcessUpdateDto,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  EntityDeleteProvider,
  EntityProvider,
  EntityUpdateProvider,
  MediaProcessProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminMediaProcessesService {
  constructor(
    @InjectModel(Document.name)
    private readonly mediaProcessModel: Model<DocumentModel>,
    private readonly mediaProcessProvider: MediaProcessProvider,
    private readonly entityProvider: EntityProvider,
    private readonly entityUpdateProvider: EntityUpdateProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider
  ) {}

  create$(mediaProcessCreate: MediaProcessCreateDto): Observable<MediaProcess> {
    const entityType =
      this.mediaProcessProvider.getEntityTypeFromMediaProcessType(
        mediaProcessCreate.type
      );
    return this.entityProvider
      .create$(
        entityType,
        DEFAULT_ENTITY_GROUP,
        mediaProcessCreate.slug,
        this.mediaProcessModel
      )
      .pipe(
        concatMapTo(
          from(
            new this.mediaProcessModel({
              ...this.mediaProcessProvider.loadNewMediaProcess(
                mediaProcessCreate.slug
              ),
              type: entityType,
            }).save()
          )
        ),
        map(this.entityProvider.validateEntityCreate),
        map(this.mediaProcessProvider.loadMediaProcess)
      );
  }

  update$(
    mediaProcessType: MediaProcessType,
    id: string,
    mediaProcessUpdate: MediaProcessUpdateDto
  ): Observable<MediaProcess> {
    const entityType =
      this.mediaProcessProvider.getEntityTypeFromMediaProcessType(
        mediaProcessType
      );

    return from(this.mediaProcessModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          true,
          this.mediaProcessModel
        )
      ),
      concatMapTo(
        this.entityUpdateProvider.update$(
          entityType,
          id,
          this.mediaProcessModel
        )
      ),
      concatMapTo(
        this.entityUpdateProvider.update$(
          entityType,
          id,
          this.mediaProcessModel
        )
      ),
      concatMapTo(
        this.mediaProcessModel.findByIdAndUpdate(id, { ...mediaProcessUpdate })
      ),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          false,
          this.mediaProcessModel
        )
      ),
      concatMapTo(this.findOne$(mediaProcessType, id))
    );
  }

  process$(
    mediaProcessType: MediaProcessType,
    id: string
  ): Observable<MediaProcess> {
    const entityType =
      this.mediaProcessProvider.getEntityTypeFromMediaProcessType(
        mediaProcessType
      );

    return from(this.mediaProcessModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          true,
          this.mediaProcessModel
        )
      ),
      concatMapTo(
        this.mediaProcessProvider.process$(
          entityType,
          id,
          this.mediaProcessModel
        )
      ),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          false,
          this.mediaProcessModel
        )
      ),
      concatMapTo(this.findOne$(mediaProcessType, id))
    );
  }

  findAll$(mediaProcessType: MediaProcessType): Observable<MediaProcess[]> {
    const entityType =
      this.mediaProcessProvider.getEntityTypeFromMediaProcessType(
        mediaProcessType
      );

    return this.entityProvider
      .findAll$(entityType, this.mediaProcessModel)
      .pipe(
        map(this.mediaProcessProvider.loadMediaProcess),
        toArray<MediaProcess>()
      );
  }

  findOne$(
    mediaProcessType: MediaProcessType,
    id: string
  ): Observable<MediaProcess> {
    const entityType =
      this.mediaProcessProvider.getEntityTypeFromMediaProcessType(
        mediaProcessType
      );

    return this.entityProvider
      .findOne$(entityType, id, this.mediaProcessModel)
      .pipe(map(this.mediaProcessProvider.loadMediaProcess));
  }

  delete$(mediaProcessType: MediaProcessType, id: string): Observable<void> {
    const entityType =
      this.mediaProcessProvider.getEntityTypeFromMediaProcessType(
        mediaProcessType
      );

    return from(this.mediaProcessModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          entityType,
          id,
          true,
          this.mediaProcessModel
        )
      ),
      concatMapTo(
        this.entityDeleteProvider.delete$(
          entityType,
          id,
          this.mediaProcessModel
        )
      )
    );
  }
}
