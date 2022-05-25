import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityType,
  GoogleDriveFolder,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  logCreatingEntityMessage,
  logFoundEntityMessage,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  createEntityForFolder$,
  findAllEntitiesForGroup$,
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
    initialPathname?: string
  ): Observable<void> {
    const pathname = initialPathname ?? entityFolder.name;
    return findOneEntity$(
      entityType,
      watermarkedType,
      group,
      pathname,
      this.entityModel
    ).pipe(
      concatMap((documentModel) => {
        if (documentModel) {
          logFoundEntityMessage(
            this.logger,
            entityFolder.name,
            entityType,
            group,
            initialPathname
          );
          return of(undefined);
        }

        logCreatingEntityMessage(
          this.logger,
          entityFolder.name,
          entityType,
          group,
          initialPathname
        );
        return findAllEntitiesForGroup$(
          entityType,
          group,
          this.entityModel
        ).pipe(
          map((documentModels) => {
            if (documentModels.length === 0) return 0;

            return documentModels
              .map((documentModel) => documentModel.order)
              .reduce((orderA, orderB) => Math.max(orderA, orderB), 0);
          }),
          concatMap((order) =>
            createEntityForFolder$(
              entityType,
              entityFolder.id,
              watermarkedType,
              group,
              pathname,
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
