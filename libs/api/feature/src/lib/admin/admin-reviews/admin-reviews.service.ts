import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { HttpService, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, iif, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, switchMapTo, toArray } from 'rxjs/operators';

import {
  Review,
  DocumentType,
  ENV,
  Image,
} from '@dark-rush-photography/shared-types';
import { Env, ReviewUpdateDto } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  ReviewProvider,
  DocumentModelProvider,
  ServerlessProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminReviewsService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly reviewModel: Model<DocumentModel>,
    private readonly reviewProvider: ReviewProvider,
    private readonly documentModelProvider: DocumentModelProvider,
    private readonly serverlessProvider: ServerlessProvider
  ) {}

  create$(slug: string): Observable<Review> {
    return from(
      this.reviewModel.findOne({ type: DocumentType.Review, slug })
    ).pipe(
      switchMap((documentModel) =>
        iif(
          () => documentModel !== null,
          of(documentModel),
          from(new this.reviewModel(this.reviewProvider.newReview(slug)).save())
        )
      ),
      map(this.documentModelProvider.validateCreate),
      map(this.reviewProvider.fromDocumentModel)
    );
  }

  update$(id: string, review: ReviewUpdateDto): Observable<Review> {
    return from(this.reviewModel.findByIdAndUpdate(id, { ...review })).pipe(
      map(this.documentModelProvider.validateFind),
      switchMapTo(this.findOne$(id))
    );
  }

  findAll$(): Observable<Review[]> {
    return from(this.reviewModel.find({ type: DocumentType.Review })).pipe(
      switchMap((documentModels) => from(documentModels)),
      map(this.reviewProvider.fromDocumentModel),
      toArray<Review>()
    );
  }

  findOne$(id: string): Observable<Review> {
    return from(this.reviewModel.findById(id)).pipe(
      map(this.documentModelProvider.validateFind),
      map(this.reviewProvider.fromDocumentModel)
    );
  }

  uploadImage$(id: string, file: Express.Multer.File): Observable<Image> {
    return this.findOne$(id).pipe(
      switchMapTo(
        this.serverlessProvider.upload$(
          this.env.serverless,
          this.httpService,
          'upload-review-image',
          id,
          DocumentType.Review,
          file
        )
      ),
      map((response) => response as Image)
    );
  }

  post$(id: string): Observable<Review> {
    return this.findOne$(id).pipe(
      switchMapTo(
        this.serverlessProvider.post$(
          this.env.serverless,
          this.httpService,
          'post-review',
          id,
          DocumentType.Review
        )
      ),
      map((response) => response as Review)
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.reviewModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
