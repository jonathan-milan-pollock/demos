import { Injectable } from '@nestjs/common';

import { Review } from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { ImageProvider } from './image.provider';
import { ImageDimensionProvider } from './image-dimension.provider';

@Injectable()
export class ReviewProvider {
  constructor(
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider
  ) {}

  fromDocumentModel(documentModel: DocumentModel): Review {
    return {
      id: documentModel._id,
      slug: documentModel.slug,
      isPublic: documentModel.isPublic,
      title: documentModel.title,
      text: documentModel.text,
      images: documentModel.images.map((image) =>
        this.imageProvider.toImage(image)
      ),
      imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
        this.imageDimensionProvider.toImageDimension(imageDimension)
      ),
    };
  }
}
