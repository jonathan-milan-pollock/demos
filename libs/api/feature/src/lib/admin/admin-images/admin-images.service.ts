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
export class AdminImagesService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly imageStateProvider: ImageStateProvider,
    @InjectModel(Document.name)
    private readonly bestOfModel: Model<DocumentModel>,
    private readonly documentModelService: DocumentModelService
  ) {}

  addOrUpdateImage(id: string, image: Image): Observable<Image> {
    return from(this.bestOfModel.findById(id).exec()).pipe(
      map((bestOf) => {
        if (!bestOf) throw new NotFoundException('Could not find best of');

        const { type, bestOfType } = bestOf;
        return this.bestOfModel.findByIdAndUpdate(bestOf.id, {
          ...bestOf,
          type,
          bestOfType,
          images: [
            ...bestOf.images.filter((i) => i.slug !== image.slug),
            { ...image },
          ],
        });
      }),
      map(() => image)
    );
  }

  findImageData$(
    bestOfType: BestOfType,
    slug: string,
    state: ImageState,
    dimensionType: ImageDimensionType
  ): Observable<ImageData> {
    return from(
      dataUriForAzureBlob$(
        this.env.azureStorageConnectionString,
        this.imageStateProvider.findAzureStorageContainerType(state),
        `${state.toLowerCase()}/best-of/${bestOfType.toLowerCase()}/${dimensionType.toLowerCase()}/${slug.toLowerCase()}.jpg`
      )
    ).pipe(
      map(
        (dataUri) =>
          ({
            slug,
            dimensionType,
            dataUri,
          } as ImageData)
      )
    );
  }

  findImagesData$(
    bestOfType: BestOfType,
    images: Image[],
    imageDimensionType: ImageDimensionType
  ): Observable<ImageData[]> {
    return from(images).pipe(
      mergeMap((image) =>
        this.findImageData$(
          bestOfType,
          image.slug,
          image.state,
          imageDimensionType
        )
      ),
      toArray<ImageData>()
    );
  }

  findAllImageData(
    id: string,
    imageDimensionType: ImageDimensionType
  ): Observable<ImageData[]> {
    return from(this.bestOfModel.findById(id).exec()).pipe(
      map((bestOf) => {
        if (!bestOf) throw new NotFoundException('Could not find best of');
        return {
          bestOfType: bestOf.bestOfType,
          images: bestOf.images,
        };
      }),
      switchMap(({ bestOfType, images }) => {
        return this.findImagesData$(
          bestOfType,
          images as Image[],
          imageDimensionType
        );
      })
    );
  }

  findImage(id: string, imageSlug: string): Observable<Image> {
    return from(this.bestOfModel.findById(id).exec()).pipe(
      map((bestOf) => {
        if (!bestOf) throw new NotFoundException('Could not find best of');

        return bestOf.images;
      }),
      map((images) => {
        const image = images.find((image) => image.slug === imageSlug);
        if (!image) {
          throw new NotFoundException(`Could not find image ${imageSlug}`);
        }
        return image;
      })
    );
  }
}
