import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { concatMapTo, from, map, Observable, toArray } from 'rxjs';

import {
  EntityType,
  SocialMedia,
  SocialMediaCreateDto,
  SocialMediaUpdateDto,
} from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityDeleteProvider,
  SocialMediaProvider,
  EntityUpdateProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminSocialMediaService {
  constructor(
    @InjectModel(Document.name)
    private readonly socialMediaModel: Model<DocumentModel>,
    private readonly socialMediaProvider: SocialMediaProvider,
    private readonly entityProvider: EntityProvider,
    private readonly entityUpdateProvider: EntityUpdateProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider
  ) {}

  create$(socialMediaCreate: SocialMediaCreateDto): Observable<SocialMedia> {
    return this.entityProvider
      .create$(
        EntityType.SocialMedia,
        socialMediaCreate.group,
        socialMediaCreate.slug,
        this.socialMediaModel
      )
      .pipe(
        concatMapTo(
          from(
            new this.socialMediaModel({
              ...this.socialMediaProvider.loadNewSocialMedia(
                socialMediaCreate.group,
                socialMediaCreate.slug
              ),
              type: EntityType.SocialMedia,
            }).save()
          )
        ),
        map(this.entityProvider.validateEntityCreate),
        map(this.socialMediaProvider.loadSocialMedia)
      );
  }

  update$(
    id: string,
    socialMediaUpdate: SocialMediaUpdateDto
  ): Observable<SocialMedia> {
    return from(this.socialMediaModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.SocialMedia,
          id,
          true,
          this.socialMediaModel
        )
      ),
      concatMapTo(
        this.entityUpdateProvider.update$(
          EntityType.SocialMedia,
          id,
          this.socialMediaModel
        )
      ),
      concatMapTo(
        this.socialMediaModel.findByIdAndUpdate(id, { ...socialMediaUpdate })
      ),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.SocialMedia,
          id,
          false,
          this.socialMediaModel
        )
      ),
      concatMapTo(this.findOne$(id))
    );
  }

  findAll$(): Observable<SocialMedia[]> {
    return this.entityProvider
      .findAll$(EntityType.SocialMedia, this.socialMediaModel)
      .pipe(
        map(this.socialMediaProvider.loadSocialMedia),
        toArray<SocialMedia>()
      );
  }

  findOne$(id: string): Observable<SocialMedia> {
    return this.entityProvider
      .findOne$(EntityType.SocialMedia, id, this.socialMediaModel)
      .pipe(map(this.socialMediaProvider.loadSocialMedia));
  }

  delete$(id: string): Observable<void> {
    return from(this.socialMediaModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.SocialMedia,
          id,
          true,
          this.socialMediaModel
        )
      ),
      concatMapTo(
        this.entityDeleteProvider.delete$(
          EntityType.SocialMedia,
          id,
          this.socialMediaModel
        )
      )
    );
  }
}
