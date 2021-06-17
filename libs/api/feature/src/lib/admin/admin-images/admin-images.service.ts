import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';
import { Model } from 'mongoose';

import { Image, PostedState } from '@dark-rush-photography/shared-types';
import {
  Document,
  DocumentModel,
  ImageProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImagesService {
  constructor(
    @InjectModel(Document.name)
    private readonly documentModel: Model<DocumentModel>,
    private readonly imageProvider: ImageProvider
  ) {}

  addOrUpdate$(image: Image): Observable<Image> {
    return from(this.documentModel.findById(image.entityId).exec()).pipe(
      switchMap((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find entity to add image');

        return from(
          this.documentModel.findByIdAndUpdate(image.entityId, {
            images: [
              ...documentModel.images.filter((i) => i.slug !== image.slug),
              { ...image },
            ],
          })
        );
      }),
      map((response) => {
        if (!response) {
          throw new BadRequestException(`Unable to add image ${image.slug}`);
        }
        return image;
      })
    );
  }

  findAll$(entityId: string, postedState: PostedState): Observable<Image[]> {
    return from(this.documentModel.findById(entityId).exec()).pipe(
      switchMap((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find entity');

        return from(
          documentModel.images.filter((i) => i.state === postedState)
        );
      }),
      map((image) => this.imageProvider.toImage(image)),
      toArray<Image>()
    );
  }

  findOne$(
    entityId: string,
    slug: string,
    postedState: PostedState
  ): Observable<Image> {
    return from(this.documentModel.findById(entityId).exec()).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find entity');

        return documentModel.images.filter((i) => i.state === postedState);
      }),
      map((images) => {
        const image = images.find((image) => image.slug === slug);
        if (!image) {
          throw new NotFoundException(`Could not find image ${slug}`);
        }
        return this.imageProvider.toImage(image);
      })
    );
  }

  create360Image$(image: Image): Observable<Image> {
    return of(image);
  }

  createTinifiedPng$(image: Image): Observable<Image> {
    return of(image);
  }

  createAppleIcons$(image: Image): Observable<Image> {
    return of(image);
  }

  createAppleImageResources$(image: Image): Observable<Image> {
    return of(image);
  }
}
