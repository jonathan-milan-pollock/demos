import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { BestOf, BestOfType } from '@dark-rush-photography/shared-types';
import {
  BestOfProvider,
  BestOfTypeProvider,
  Document,
  DocumentModel,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminBestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly bestOfProvider: BestOfProvider,
    private readonly bestOfTypeProvider: BestOfTypeProvider
  ) {}

  create$(bestOfType: BestOfType): Observable<BestOf> {
    return from(
      this.bestOfModel.findOne({
        type: this.bestOfTypeProvider.findDocumentType(bestOfType),
      })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel)
          throw new ConflictException(
            `Best of ${bestOfType} has already been created`,
            HttpStatus.FOUND
          );

        return from(
          new this.bestOfModel({
            type: this.bestOfTypeProvider.findDocumentType(bestOfType),
            slug: bestOfType,
            isPublic: true,
            images: [],
            imageDimensions: [],
            comments: [],
            emotions: [],
          } as BestOf).save()
        );
      }),
      map((documentModel: DocumentModel) => {
        if (!documentModel) {
          throw new BadRequestException(
            `Unable to create best of ${bestOfType}`
          );
        }
        return this.bestOfProvider.fromDocumentModel(documentModel);
      })
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.bestOfModel.findByIdAndDelete(id)).pipe(mapTo(undefined));
  }
}
