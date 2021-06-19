import {
  BadRequestException,
  HttpService,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';

import {
  ENV,
  ImageDimension,
  ImageDimensionData,
} from '@dark-rush-photography/shared-types';
import {
  Env,
  ImageDimensionAddDto,
  ImageDimensionUpdateDto,
} from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  ImageDimensionProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImageDimensionsService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageDimensionProvider: ImageDimensionProvider
  ) {}

  add$(
    entityId: string,
    imageId: string,
    imageDimension: ImageDimensionAddDto
  ): Observable<ImageDimension> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId).exec()).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException(
            'Could not find entity to add image dimension'
          );

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            imageDimensions: [
              ...response.imageDimensions.filter(
                (id) => id.imageId !== imageId
              ),
              { ...imageDimension, id, entityId, imageId },
            ],
          })
        );
      }),
      switchMapTo(
        this.imageDimensionProvider.findById$(this.entityModel, entityId, id)
      )
    );
  }

  update$(
    entityId: string,
    imageId: string,
    imageDimensionId: string,
    imageDimension: ImageDimensionUpdateDto
  ): Observable<ImageDimension> {
    return from(this.entityModel.findById(entityId).exec()).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException(
            'Could not find entity to add image dimension'
          );

        const foundImageDimension = response.imageDimensions.find(
          (id) => id.id === imageDimensionId
        );
        if (!foundImageDimension)
          throw new NotFoundException(
            'Could not find image dimension to update'
          );

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            imageDimensions: [
              ...response.imageDimensions.filter(
                (id) => id.imageId !== imageId
              ),
              {
                ...imageDimension,
                id: imageDimensionId,
                entityId,
                imageId,
                type: foundImageDimension.type,
                pixels: foundImageDimension.pixels,
              },
            ],
          })
        );
      }),
      switchMapTo(
        this.imageDimensionProvider.findById$(
          this.entityModel,
          entityId,
          imageDimensionId
        )
      )
    );
  }

  getData$(
    entityId: string,
    imageId: string,
    imageDimensionId: string
  ): Observable<ImageDimensionData> {
    return from(
      this.httpService.post(
        `${this.env.serverless.drpServerlessUrl}/image-dimension-data`,
        {
          headers: {
            'x-functions-key': this.env.serverless.drpServerlessFunctionsKey,
          },
        }
      )
    ).pipe(map((axiosResponse) => axiosResponse.data));
  }

  remove$(entityId: string, imageDimensionId: string): Observable<void> {
    return from(this.entityModel.findById(entityId).exec()).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException(
            'Could not find entity to remove image dimension'
          );

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            imageDimensions: [
              ...response.imageDimensions.filter(
                (id) => id.id !== imageDimensionId
              ),
            ],
          })
        );
      }),
      map((response) => {
        if (!response) {
          throw new BadRequestException('Unable to remove image dimension');
        }
      })
    );
  }
}
