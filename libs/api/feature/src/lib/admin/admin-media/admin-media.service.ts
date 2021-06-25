import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { HttpService, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, iif, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, switchMapTo, toArray } from 'rxjs/operators';

import {
  ENV,
  DocumentType,
  Image,
  Media,
  MediaType,
} from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  DocumentModelProvider,
  MediaProvider,
  ServerlessProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminMediaService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly mediaModel: Model<DocumentModel>,
    private readonly mediaProvider: MediaProvider,
    private readonly documentModelProvider: DocumentModelProvider,
    private readonly serverlessProvider: ServerlessProvider
  ) {}

  create$(mediaType: MediaType, slug: string): Observable<Media> {
    return from(
      this.mediaModel.findOne({
        type: this.mediaProvider.findDocumentType(mediaType),
        slug,
      })
    ).pipe(
      switchMap((documentModel) =>
        iif(
          () => documentModel !== null,
          of(documentModel),
          from(
            new this.mediaModel(this.mediaProvider.newMedia(mediaType)).save()
          )
        )
      ),
      map(this.documentModelProvider.validateCreate),
      map(this.mediaProvider.fromDocumentModel)
    );
  }

  findAll$(mediaType: MediaType): Observable<Media[]> {
    return from(
      this.mediaModel.find({
        type: this.mediaProvider.findDocumentType(mediaType),
      })
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map(this.mediaProvider.fromDocumentModel),
      toArray<Media>()
    );
  }

  findOne$(id: string): Observable<Media> {
    return from(this.mediaModel.findById(id)).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.mediaProvider.fromDocumentModel)
    );
  }

  uploadAppleIcon$(id: string, file: Express.Multer.File): Observable<Image> {
    return from(this.findOne$(id)).pipe(
      switchMapTo(
        this.serverlessProvider.upload$(
          this.env.serverless,
          this.httpService,
          'upload-media-apple-icon',
          id,
          DocumentType.MediaAppleIcon,
          file
        )
      ),
      map((response) => response as Image)
    );
  }

  processAppleIcon$(id: string): Observable<Media> {
    return from(this.findOne$(id)).pipe(
      switchMapTo(
        this.serverlessProvider.process$(
          this.env.serverless,
          this.httpService,
          'process-media-apple-icon',
          id,
          DocumentType.MediaAppleIcon
        )
      ),
      map((response) => response as Media)
    );
  }

  uploadAppleResource$(
    id: string,
    file: Express.Multer.File
  ): Observable<Image> {
    return from(this.findOne$(id)).pipe(
      switchMapTo(
        this.serverlessProvider.upload$(
          this.env.serverless,
          this.httpService,
          'upload-media-apple-resource',
          id,
          DocumentType.MediaAppleResource,
          file
        )
      ),
      map((response) => response as Image)
    );
  }

  processAppleResource$(id: string): Observable<Media> {
    return from(this.findOne$(id)).pipe(
      switchMapTo(
        this.serverlessProvider.process$(
          this.env.serverless,
          this.httpService,
          'process-media-apple-resource',
          id,
          DocumentType.MediaAppleResource
        )
      ),
      map((response) => response as Media)
    );
  }

  uploadImageVideo$(id: string, file: Express.Multer.File): Observable<Image> {
    return from(this.findOne$(id)).pipe(
      switchMapTo(
        this.serverlessProvider.upload$(
          this.env.serverless,
          this.httpService,
          'upload-media-image-video',
          id,
          DocumentType.MediaImageVideo,
          file
        )
      ),
      map((response) => response as Image)
    );
  }

  processImageVideo$(id: string): Observable<Media> {
    return from(this.findOne$(id)).pipe(
      switchMapTo(
        this.serverlessProvider.process$(
          this.env.serverless,
          this.httpService,
          'process-media-image-video',
          id,
          DocumentType.MediaImageVideo
        )
      ),
      map((response) => response as Media)
    );
  }

  uploadMobileImage$(id: string, file: Express.Multer.File): Observable<Image> {
    return from(this.findOne$(id)).pipe(
      switchMapTo(
        this.serverlessProvider.upload$(
          this.env.serverless,
          this.httpService,
          'upload-media-mobile-image',
          id,
          DocumentType.MediaMobileImage,
          file
        )
      ),
      map((response) => response as Image)
    );
  }

  processMobileImage$(id: string): Observable<Media> {
    return from(this.findOne$(id)).pipe(
      switchMapTo(
        this.serverlessProvider.process$(
          this.env.serverless,
          this.httpService,
          'process-media-mobile-image',
          id,
          DocumentType.MediaMobileImage
        )
      ),
      map((response) => response as Media)
    );
  }

  uploadPng$(id: string, file: Express.Multer.File): Observable<Image> {
    return from(this.findOne$(id)).pipe(
      switchMapTo(
        this.serverlessProvider.upload$(
          this.env.serverless,
          this.httpService,
          'upload-media-png',
          id,
          DocumentType.MediaMobileImage,
          file
        )
      ),
      map((response) => response as Image)
    );
  }

  processPng$(id: string): Observable<Media> {
    return from(this.findOne$(id)).pipe(
      switchMapTo(
        this.serverlessProvider.process$(
          this.env.serverless,
          this.httpService,
          'process-media-png',
          id,
          DocumentType.MediaPng
        )
      ),
      map((response) => response as Media)
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.mediaModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
