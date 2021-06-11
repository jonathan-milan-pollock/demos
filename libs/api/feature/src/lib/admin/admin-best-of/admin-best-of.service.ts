import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { Model } from 'mongoose';

import {
  ENV,
  BestOf,
  BestOfType,
  DocumentType,
  ImageDimensionType,
  Image,
  ImageData,
  ImageState,
} from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';
import {
  dataUriForAzureBlob$,
  Document,
  DocumentModel,
  DocumentModelService,
} from '@dark-rush-photography/api/data';
import { ImageStateProvider } from '@dark-rush-photography/api/util';

@Injectable()
export class AdminBestOfService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly imageStateProvider: ImageStateProvider,
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly documentModelService: DocumentModelService
  ) {}

  create(bestOf: BestOf): Observable<BestOf> {
    return from(
      new this.bestOfModel({
        ...bestOf,
        type: DocumentType.BestOf,
        bestOfType: bestOf.bestOfType,
        isPublic: true,
      }).save()
    ).pipe(
      map((documentModel) => this.documentModelService.toBestOf(documentModel))
    );
  }

  update(id: string, bestOf: BestOf): Observable<BestOf> {
    return from(this.bestOfModel.findById(id)).pipe(
      switchMap((documentModel) => {
        if (!documentModel) {
          throw new NotFoundException('Could not find best of');
        }
        return from(
          this.bestOfModel.findByIdAndUpdate(id, {
            ...bestOf,
            type: documentModel.type,
          })
        );
      }),
      map((documentModel) => {
        if (!documentModel) {
          throw new ConflictException('Unable to update best of');
        }
        return this.documentModelService.toBestOf(documentModel);
      })
    );
  }

  delete(id: string): Observable<string> {
    return of(this.bestOfModel.findByIdAndDelete(id)).pipe(
      map(() => id) //TODO: What if this fails???
    );
  }
}
