import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { concatMapTo, from, map, Observable, toArray } from 'rxjs';

import {
  Destination,
  DestinationCreateDto,
  DestinationUpdateDto,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityUpdateProvider,
  EntityDeleteProvider,
  EntityPostProvider,
  DestinationProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminDestinationsService {
  constructor(
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>,
    private readonly destinationProvider: DestinationProvider,
    private readonly entityProvider: EntityProvider,
    private readonly entityUpdateProvider: EntityUpdateProvider,
    private readonly entityPostProvider: EntityPostProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider
  ) {}

  create$(destinationCreate: DestinationCreateDto): Observable<Destination> {
    return this.entityProvider
      .create$(
        EntityType.Destination,
        DEFAULT_ENTITY_GROUP,
        destinationCreate.slug,
        this.destinationModel
      )
      .pipe(
        concatMapTo(
          from(
            new this.destinationModel({
              ...this.destinationProvider.loadNewDestination(
                destinationCreate.slug
              ),
              type: EntityType.Destination,
            }).save()
          )
        ),
        map(this.entityProvider.validateEntityCreate),
        map(this.destinationProvider.loadDestination)
      );
  }

  update$(
    id: string,
    destinationUpdate: DestinationUpdateDto
  ): Observable<Destination> {
    return from(this.destinationModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Destination,
          id,
          true,
          this.destinationModel
        )
      ),
      concatMapTo(
        this.entityUpdateProvider.update$(
          EntityType.Destination,
          id,
          this.destinationModel
        )
      ),
      concatMapTo(
        this.destinationModel.findByIdAndUpdate(id, { ...destinationUpdate })
      ),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Destination,
          id,
          false,
          this.destinationModel
        )
      ),
      concatMapTo(this.findOne$(id))
    );
  }

  post$(id: string): Observable<Destination> {
    return from(this.destinationModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Destination,
          id,
          true,
          this.destinationModel
        )
      ),
      concatMapTo(
        this.entityPostProvider.post$(
          EntityType.Destination,
          id,
          this.destinationModel
        )
      ),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Destination,
          id,
          false,
          this.destinationModel
        )
      ),
      concatMapTo(this.findOne$(id))
    );
  }

  findAll$(): Observable<Destination[]> {
    return this.entityProvider
      .findAll$(EntityType.Destination, this.destinationModel)
      .pipe(
        map(this.destinationProvider.loadDestination),
        toArray<Destination>()
      );
  }

  findOne$(id: string): Observable<Destination> {
    return this.entityProvider
      .findOne$(EntityType.Destination, id, this.destinationModel)
      .pipe(map(this.destinationProvider.loadDestination));
  }

  delete$(id: string): Observable<void> {
    return from(this.destinationModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Destination,
          id,
          true,
          this.destinationModel
        )
      ),
      concatMapTo(
        this.entityDeleteProvider.delete$(
          EntityType.Destination,
          id,
          this.destinationModel
        )
      )
    );
  }
}
