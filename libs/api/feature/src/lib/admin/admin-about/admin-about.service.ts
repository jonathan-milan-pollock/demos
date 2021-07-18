import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { concatMapTo, from, map, Observable, toArray } from 'rxjs';

import {
  About,
  AboutCreateDto,
  AboutUpdateDto,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityDeleteProvider,
  EntityUpdateProvider,
  AboutProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminAboutService {
  constructor(
    @InjectModel(Document.name)
    private readonly aboutModel: Model<DocumentModel>,
    private readonly aboutProvider: AboutProvider,
    private readonly entityProvider: EntityProvider,
    private readonly entityUpdateProvider: EntityUpdateProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider
  ) {}

  create$(aboutCreate: AboutCreateDto): Observable<About> {
    return this.entityProvider
      .create$(
        EntityType.About,
        DEFAULT_ENTITY_GROUP,
        aboutCreate.slug,
        this.aboutModel
      )
      .pipe(
        concatMapTo(
          from(
            new this.aboutModel({
              ...this.aboutProvider.loadNewAbout(aboutCreate.slug),
              type: EntityType.About,
              isPublic: true,
            }).save()
          )
        ),
        map(this.entityProvider.validateEntityCreate),
        map(this.aboutProvider.loadAbout)
      );
  }

  update$(id: string, aboutUpdate: AboutUpdateDto): Observable<About> {
    return from(this.aboutModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.About,
          id,
          true,
          this.aboutModel
        )
      ),
      concatMapTo(
        this.entityUpdateProvider.update$(EntityType.About, id, this.aboutModel)
      ),
      concatMapTo(this.aboutModel.findByIdAndUpdate(id, { ...aboutUpdate })),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.About,
          id,
          false,
          this.aboutModel
        )
      ),
      concatMapTo(this.findOne$(id))
    );
  }

  findAll$(): Observable<About[]> {
    return this.entityProvider
      .findAll$(EntityType.About, this.aboutModel)
      .pipe(map(this.aboutProvider.loadAbout), toArray<About>());
  }

  findOne$(id: string): Observable<About> {
    return this.entityProvider
      .findOne$(EntityType.About, id, this.aboutModel)
      .pipe(map(this.aboutProvider.loadAbout));
  }

  delete$(id: string): Observable<void> {
    return from(this.aboutModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.About,
          id,
          true,
          this.aboutModel
        )
      ),
      concatMapTo(
        this.entityDeleteProvider.delete$(EntityType.About, id, this.aboutModel)
      )
    );
  }
}
