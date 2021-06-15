import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { ENV, Destination } from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class AdminDestinationsService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>
  ) {}

  create(destination: Destination): Observable<Destination> {
    return from(new this.destinationModel(destination).save());
  }

  update(id: string, destination: Destination): Observable<Destination> {
    return from(this.destinationModel.findById(id)).pipe(
      tap((d) => {
        if (!d) {
          throw new NotFoundException('Could not find destination');
        }
      }),
      //switchMap(() => this.destinationModel.findByIdAndUpdate(id, destination)),
      map((d) => d as Destination)
    );
  }

  delete(id: string): Observable<void> {
    return of(this.destinationModel.findByIdAndDelete(id)).pipe(
      map(() => undefined)
    );
  }
}
