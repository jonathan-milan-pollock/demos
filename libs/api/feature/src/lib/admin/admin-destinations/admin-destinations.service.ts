import {
  BadRequestException,
  HttpService,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, toArray } from 'rxjs/operators';

import {
  Destination,
  DocumentType,
  ENV,
} from '@dark-rush-photography/shared-types';
import { DestinationUpdateDto, Env } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  DestinationProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminDestinationsService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>,
    private readonly destinationProvider: DestinationProvider
  ) {}

  create$(slug: string): Observable<Destination> {
    return from(
      this.destinationModel.findOne({ type: DocumentType.Destination, slug })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel) return of(documentModel);

        return from(
          new this.destinationModel({
            type: DocumentType.Destination,
            slug,
            isPublic: false,
            keywords: [],
            useTileImage: false,
            text: [],
            images: [],
            imageDimensions: [],
            videos: [],
            videoDimensions: [],
            hasExtendedReality: false,
            socialMediaUrls: [],
            comments: [],
            emotions: [],
          } as Destination).save()
        );
      }),
      map((documentModel: DocumentModel) => {
        if (!documentModel) {
          throw new BadRequestException(`Unable to create destination ${slug}`);
        }
        return this.destinationProvider.fromDocumentModel(documentModel);
      })
    );
  }

  update$(
    id: string,
    destination: DestinationUpdateDto
  ): Observable<Destination> {
    return from(
      this.destinationModel.findByIdAndUpdate(id, {
        slug: destination.slug,
        isPublic: destination.isPublic,
        title: destination.title,
        description: destination.description,
        keywords: destination.keywords,
        datePublished: destination.datePublished,
        location: destination.location,
        useTileImage: destination.useTileImage,
        text: destination.text,
        hasExtendedReality: destination.hasExtendedReality,
        websiteUrl: destination.websiteUrl,
        socialMediaUrls: destination.socialMediaUrls,
      } as DestinationUpdateDto)
    ).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException(
            `Unable to update destination ${destination.slug}`
          );

        return this.destinationProvider.fromDocumentModel(documentModel);
      })
    );
  }

  findAll$(): Observable<Destination[]> {
    return from(
      this.destinationModel.find({ type: DocumentType.Destination }).exec()
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map((documentModel) =>
        this.destinationProvider.fromDocumentModel(documentModel)
      ),
      toArray<Destination>()
    );
  }

  findOne$(id: string): Observable<Destination> {
    return from(this.destinationModel.findById(id).exec()).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find Destination');

        return this.destinationProvider.fromDocumentModel(documentModel);
      })
    );
  }

  post$(id: string): Observable<Destination> {
    return this.destinationProvider.post$(
      this.env.serverless,
      this.httpService,
      id
    );
  }

  delete$(id: string): Observable<void> {
    return of(this.destinationModel.findByIdAndDelete(id)).pipe(
      mapTo(undefined)
    );
  }
}
