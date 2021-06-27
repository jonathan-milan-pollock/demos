import { HttpService, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, switchMapTo, tap } from 'rxjs/operators';

import { Entity, ENV, Image } from '@dark-rush-photography/shared-types';
import {
  Env,
  ImageAddDto,
  ImageUpdateDto,
} from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  DocumentModelProvider,
  ImageProvider,
  ServerlessProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImagesService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageProvider: ImageProvider,
    private readonly documentModelProvider: DocumentModelProvider,
    private readonly serverlessProvider: ServerlessProvider
  ) {}

  add$(entityId: string, imageAdd: ImageAddDto): Observable<Image> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        const foundImage = this.imageProvider.findImageBySlug(
          imageAdd.fileName,
          documentModel.images
        );
        if (foundImage) return of(documentModel);

        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.imageProvider.addImage(
              id,
              entityId,
              imageAdd,
              documentModel.images
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
    imageUpdate: ImageUpdateDto
  ): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        const foundImage = this.imageProvider.validateUpdateImage(
          id,
          imageUpdate.postState,
          documentModel.images
        );

        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.imageProvider.updateImage(
              id,
              foundImage,
              imageUpdate,
              documentModel.images
            )
          )
        );
      }),
      switchMapTo(this.findOne$(id, entityId))
    );
  }

  findOne$(id: string, entityId: string): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      map((documentModel) =>
        this.imageProvider.validateFindImage(id, documentModel.images)
      ),
      map((image) => this.imageProvider.toImage(image))
    );
  }

  uploadThreeSixtyImage$(
    entityId: string,
    file: Express.Multer.File
  ): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) =>
        this.serverlessProvider.upload$(
          this.env.serverless,
          this.httpService,
          'upload-three-sixty-image',
          documentModel as Entity,
          documentModel.type,
          file
        )
      ),
      map((response) => response as Image)
    );
  }

  post$(id: string, entityId: string): Observable<Image> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      tap((documentModel) => {
        this.imageProvider.validateFindImage(id, documentModel.images);
      }),
      switchMap((documentModel) =>
        this.serverlessProvider.post$(
          this.env.serverless,
          this.httpService,
          'post-image',
          id,
          documentModel.type
        )
      ),
      map((response) => response as Image)
    );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.imageProvider.removeImage(
              id,
              documentModel.images,
              documentModel.imageDimensions
            )
          )
        );
      }),
      map(this.documentModelProvider.validateRemove)
    );
  }
}
