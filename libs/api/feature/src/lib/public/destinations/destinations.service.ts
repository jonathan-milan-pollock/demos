import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { Destination } from '@dark-rush-photography/shared-types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>
  ) {}

  getDestinations(): Observable<Destination[]> {
    return from(this.destinationModel.find({ type: 'Destination' }).exec());
  }

  getDestination(id: string): Observable<Destination> {
    return from(this.destinationModel.findById(id)).pipe(
      tap((d) => {
        if (!d) {
          throw new NotFoundException('Could not find destination');
        }
      }),
      map((d) => d as Destination)
    );
  }
}
