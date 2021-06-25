import { HttpService, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { from, iif, Observable, of } from 'rxjs';
import { map, switchMap, switchMapTo, tap } from 'rxjs/operators';

import {
  ENV,
  ImageDimension,
  ImageDimensionData,
} from '@dark-rush-photography/shared-types';
import {
  Env,
  ImageDimensionAddDto,
  ImageDimensionUpdateDto,
} from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  DocumentModelProvider,
  ImageDimensionProvider,
  ServerlessProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImageDimensionsService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageDimensionProvider: ImageDimensionProvider,
    private readonly documentModelProvider: DocumentModelProvider,
    private readonly serverlessProvider: ServerlessProvider
  ) {}

  add$(
    entityId: string,
    imageId: string,
    imageDimension: ImageDimensionAddDto
  ): Observable<ImageDimension> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        const foundImageDimension = this.imageDimensionProvider.findImageDimension(
          imageId,
          imageDimension.type,
          documentModel.imageDimensions
        );
        return iif(
          () => !!foundImageDimension,
          of(foundImageDimension),
          from(
            this.entityModel.findByIdAndUpdate(
              entityId,
              this.imageDimensionProvider.addImageDimension(
                id,
                entityId,
                imageId,
                imageDimension,
                documentModel.imageDimensions
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
    imageDimension: ImageDimensionUpdateDto
  ): Observable<ImageDimension> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        const foundImageDimension = this.imageDimensionProvider.validateFindImageDimension(
          id,
          documentModel.imageDimensions
        );
        const updateImageDimension = this.imageDimensionProvider.updateImageDimension(
          id,
          foundImageDimension,
          imageDimension,
          documentModel.imageDimensions
        );
        return from(
          this.entityModel.findByIdAndUpdate(entityId, updateImageDimension)
        );
      }),
      switchMapTo(this.findOne$(id, entityId))
    );
  }

  findOne$(id: string, entityId: string): Observable<ImageDimension> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      map((documentModel) => {
        const imageDimension = this.imageDimensionProvider.validateFindImageDimension(
          id,
          documentModel.imageDimensions
        );
        return this.imageDimensionProvider.toImageDimension(imageDimension);
      })
    );
  }

  data$(id: string, entityId: string): Observable<ImageDimensionData> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      tap((documentModel) => {
        this.imageDimensionProvider.validateFindImageDimension(
          id,
          documentModel.imageDimensions
        );
      }),
      switchMap((documentModel) => {
        return this.serverlessProvider.mediaData$(
          this.env.serverless,
          this.httpService,
          'image-dimension-data',
          id,
          entityId,
          documentModel.type
        );
      }),
      map((response) => response as ImageDimensionData)
    );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) =>
        from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.imageDimensionProvider.removeImageDimension(
              id,
              documentModel.imageDimensions
            )
          )
        )
      ),
      map(this.documentModelProvider.validateRemove)
    );
  }
}
