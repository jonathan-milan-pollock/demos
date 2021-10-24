import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, max, Observable, of, take } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityType,
  GoogleDriveFolder,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  creatingEntityLogMessage,
  foundEntityLogMessage,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { loadDocumentModelsArray } from '../entities/entity-load-document-model.functions';
import {
  createEntityForFolder$,
  findOneEntity$,
} from '../entities/entity-repository.functions';

@Injectable()
export class EntityCreateOneForFolderProvider {
  private readonly logger: Logger;
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(EntityCreateOneForFolderProvider.name);
  }

  createOneEntityForFolder$(
    entityFolder: GoogleDriveFolder,
    entityType: EntityType,
    watermarkedType: WatermarkedType,
    group: string,
    initialSlug?: string
  ): Observable<void> {
    const slug = initialSlug ?? entityFolder.name;
    return findOneEntity$(
      entityType,
      watermarkedType,
      group,
      slug,
      this.entityModel
    ).pipe(
      concatMap((documentModel) => {
        if (documentModel) {
          this.logger.log(
            foundEntityLogMessage(
              entityFolder.name,
              entityType,
              group,
              initialSlug
            )
          );
          return of(undefined);
        }

        this.logger.log(
          creatingEntityLogMessage(
            entityFolder.name,
            entityType,
            group,
            initialSlug
          )
        );
        return from(this.entityModel.find({ type: entityType, group })).pipe(
          map(loadDocumentModelsArray),
          concatMap((documentModels) => {
            if (documentModels.length === 0) return of(0);

            return from(
              documentModels.map((documentModel) => documentModel.order)
            ).pipe(max(), take(1));
          }),
          concatMap((order) =>
            createEntityForFolder$(
              entityType,
              entityFolder.id,
              watermarkedType,
              group,
              slug,
              order + 1,
              this.entityModel
            )
          )
        );
      }),
      map(() => undefined)
    );
  }
}
