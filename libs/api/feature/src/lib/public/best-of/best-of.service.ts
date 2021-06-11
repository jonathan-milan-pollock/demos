import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';
import { Model } from 'mongoose';

import { DocumentType, BestOf } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  DocumentModelService,
} from '@dark-rush-photography/api/data';

@Injectable()
export class BestOfService {
  constructor(
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly documentModelService: DocumentModelService
  ) {}

  findAll(): Observable<BestOf[]> {
    return from(
      this.bestOfModel.find({ type: DocumentType.BestOf }).exec()
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map((documentModel) => this.documentModelService.toBestOf(documentModel)),
      toArray<BestOf>()
    );
  }

  findOne(id: string): Observable<BestOf> {
    return from(this.bestOfModel.findById(id).exec()).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find best of');

        return this.documentModelService.toBestOf(documentModel);
      })
    );
  }
}
