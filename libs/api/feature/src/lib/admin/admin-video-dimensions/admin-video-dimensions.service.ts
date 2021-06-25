import { HttpService, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { from, iif, Observable, of } from 'rxjs';
import { map, switchMap, switchMapTo, tap } from 'rxjs/operators';

import {
  ENV,
  VideoDimension,
  VideoDimensionData,
} from '@dark-rush-photography/shared-types';
import {
  Env,
  VideoDimensionAddDto,
  VideoDimensionUpdateDto,
} from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  DocumentModelProvider,
  ServerlessProvider,
  VideoDimensionProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminVideoDimensionsService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly videoDimensionProvider: VideoDimensionProvider,
    private readonly documentModelProvider: DocumentModelProvider,
    private readonly serverlessProvider: ServerlessProvider
  ) {}

  add$(
    entityId: string,
    videoId: string,
    videoDimension: VideoDimensionAddDto
  ): Observable<VideoDimension> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        const foundVideoDimension = this.videoDimensionProvider.findVideoDimension(
          videoId,
          videoDimension.type,
          documentModel.videoDimensions
        );
        return iif(
          () => !!foundVideoDimension,
          of(foundVideoDimension),
          from(
            this.entityModel.findByIdAndUpdate(
              entityId,
              this.videoDimensionProvider.addVideoDimension(
                id,
                entityId,
                videoId,
                videoDimension,
                documentModel.videoDimensions
              )
            )
          )
        );
      }),
      switchMapTo(this.findOne$(id, entityId))
    );
  }

  update$(
    id: string,
    entityId: string,
    videoDimension: VideoDimensionUpdateDto
  ): Observable<VideoDimension> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        const foundVideoDimension = this.videoDimensionProvider.validateFindVideoDimension(
          id,
          documentModel.videoDimensions
        );
        const updateVideoDimension = this.videoDimensionProvider.updateVideoDimension(
          id,
          foundVideoDimension,
          videoDimension,
          documentModel.videoDimensions
        );
        return from(
          this.entityModel.findByIdAndUpdate(entityId, updateVideoDimension)
        );
      }),
      switchMapTo(this.findOne$(id, entityId))
    );
  }

  findOne$(id: string, entityId: string): Observable<VideoDimension> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      map((documentModel) => {
        const videoDimension = this.videoDimensionProvider.validateFindVideoDimension(
          id,
          documentModel.videoDimensions
        );
        return this.videoDimensionProvider.toVideoDimension(videoDimension);
      })
    );
  }

  data$(id: string, entityId: string): Observable<VideoDimensionData> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      tap((documentModel) => {
        this.videoDimensionProvider.validateFindVideoDimension(
          id,
          documentModel.videoDimensions
        );
      }),
      switchMap((documentModel) => {
        return this.serverlessProvider.mediaData$(
          this.env.serverless,
          this.httpService,
          'video-dimension-data',
          id,
          entityId,
          documentModel.type
        );
      }),
      map((response) => response as VideoDimensionData)
    );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) =>
        from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.videoDimensionProvider.removeVideoDimension(
              id,
              documentModel.videoDimensions
            )
          )
        )
      ),
      map(this.documentModelProvider.validateRemove)
    );
  }
}
