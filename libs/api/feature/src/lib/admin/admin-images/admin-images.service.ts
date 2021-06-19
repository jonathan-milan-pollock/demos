import {
  BadRequestException,
  HttpService,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';

import { ENV, Image } from '@dark-rush-photography/shared-types';
import {
  Document,
  DocumentModel,
  ImageProvider,
} from '@dark-rush-photography/api/data';
import {
  Env,
  ImageAddDto,
  ImageUpdateDto,
} from '@dark-rush-photography/api/types';

@Injectable()
export class AdminImagesService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageProvider: ImageProvider
  ) {}

  add$(entityId: string, image: ImageAddDto): Observable<Image> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId).exec()).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException('Could not find entity to add image');

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            images: [
              ...response.images,
              {
                ...image,
                id,
                entityId,
                order: 0,
                isStared: false,
                isLoved: false,
                isLiked: false,
              },
            ],
          })
        );
      }),
      switchMapTo(this.imageProvider.findById$(this.entityModel, entityId, id))
    );
  }

  update$(
    entityId: string,
    imageId: string,
    image: ImageUpdateDto
  ): Observable<Image> {
    return from(this.entityModel.findById(entityId).exec()).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException('Could not find entity to update image');

        const foundImage = response.images.find((i) => i.id === imageId);
        if (!foundImage)
          throw new NotFoundException('Could not find image to update');

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            images: [
              ...response.images.filter((i) => i.id !== imageId),
              { ...image, id: imageId, entityId },
            ],
          })
        );
      }),
      switchMapTo(
        this.imageProvider.findById$(this.entityModel, entityId, imageId)
      )
    );
  }

  uploadThreeSixty$(
    entityId: string,
    file: Express.Multer.File
  ): Observable<Image> {
    return this.imageProvider.uploadThreeSixty$(
      this.env.serverless,
      this.httpService,
      entityId,
      file
    );
  }

  uploadReview$(
    reviewId: string,
    file: Express.Multer.File
  ): Observable<Image> {
    return this.imageProvider.uploadReview$(
      this.env.serverless,
      this.httpService,
      reviewId,
      file
    );
  }

  uploadMediaPng$(
    mediaId: string,
    file: Express.Multer.File
  ): Observable<Image> {
    return this.imageProvider.uploadMediaPng$(
      this.env.serverless,
      this.httpService,
      mediaId,
      file
    );
  }

  uploadMediaAppleIcon$(
    mediaId: string,
    file: Express.Multer.File
  ): Observable<Image> {
    return this.imageProvider.uploadMediaAppleIcon$(
      this.env.serverless,
      this.httpService,
      mediaId,
      file
    );
  }

  uploadMediaAppleResource$(
    mediaId: string,
    file: Express.Multer.File
  ): Observable<Image> {
    return this.imageProvider.uploadMediaAppleResource$(
      this.env.serverless,
      this.httpService,
      mediaId,
      file
    );
  }

  remove$(entityId: string, imageId: string): Observable<void> {
    return from(this.entityModel.findById(entityId).exec()).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException('Could not find entity to remove image');

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            images: [...response.images.filter((i) => i.id !== imageId)],
            imageDimensions: [
              ...response.imageDimensions.filter(
                (id) => id.imageId !== imageId
              ),
            ],
          })
        );
      }),
      map((response) => {
        if (!response) {
          throw new BadRequestException('Unable to remove image');
        }
      })
    );
  }
}
