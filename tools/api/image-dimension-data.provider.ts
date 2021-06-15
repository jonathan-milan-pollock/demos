import { Inject, Injectable } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';

import {
  ENV,
  DocumentType,
  Image,
  ImageDimensionData,
  ImageDimensionType,
  PostedState,
} from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';
import { dataUriForAzureBlob$ } from '../azure-storage/azure-storage-image.functions';
import { PostedStateProvider } from './posted-state.provider';

@Injectable()
export class ImageDimensionDataProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly postedStateProvider: PostedStateProvider
  ) {}

  findImagesData$(
    documentType: DocumentType,
    imageDimensionType: ImageDimensionType,
    images: Image[]
  ): Observable<ImageDimensionData[]> {
    return from(images).pipe(
      mergeMap((image) =>
        this.findImageDimensionData$(
          documentType,
          image.slug,
          image.state,
          imageDimensionType
        )
      ),
      toArray<ImageDimensionData>()
    );
  }

  findImageDimensionData$(
    documentType: DocumentType,
    imageSlug: string,
    state: PostedState,
    imageDimensionType: ImageDimensionType
  ): Observable<ImageDimensionData> {
    return from(
      dataUriForAzureBlob$(
        this.env.azureStorageConnectionString,
        this.postedStateProvider.findAzureStorageContainerType(state),
        `${state.toLowerCase()}/best-of/${documentType.toLowerCase()}/${imageDimensionType.toLowerCase()}/${imageSlug.toLowerCase()}.jpg`
      )
    ).pipe(
      map(
        (dataUri) =>
          ({
            slug: imageSlug,
            type: imageDimensionType,
            dataUri,
          } as ImageDimensionData)
      )
    );
  }
}
