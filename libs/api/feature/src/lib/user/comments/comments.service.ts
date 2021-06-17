import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';
import { Model } from 'mongoose';

import { Image } from '@dark-rush-photography/shared-types';
import { Document, DocumentModel } from '@dark-rush-photography/api/data';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Document.name)
    private readonly documentModel: Model<DocumentModel>
  ) {}

  //TODO: Post Mobile Image
  //TODO: Post Three Sixty Image

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
}
