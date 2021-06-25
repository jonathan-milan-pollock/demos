import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

import {
  Image,
  ImageDimension,
  PostedState,
} from '@dark-rush-photography/shared-types';
import { ImageAddDto, ImageUpdateDto } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../functions/image.functions';

@Injectable()
export class ImageProvider {
  addImage = (
    id: string,
    entityId: string,
    image: ImageAddDto,
    images: Image[]
  ): Partial<DocumentModel> => ({
    images: [
      ...images,
      {
        ...image,
        id,
        entityId,
        state: PostedState.New,
        order: 0,
        isStared: false,
        isLoved: false,
        isLiked: false,
      },
    ],
  });

  updateImage = (
    id: string,
    entityId: string,
    image: ImageUpdateDto,
    images: Image[]
  ): Partial<DocumentModel> => ({
    images: [...images.filter((i) => i.id !== id), { ...image, id, entityId }],
  });

  removeImage = (
    id: string,
    images: Image[],
    imageDimensions: ImageDimension[]
  ): Partial<DocumentModel> => ({
    images: [...images.filter((i) => i.id !== id)],
    imageDimensions: [
      ...imageDimensions.filter(
        (imageDimension) => imageDimension.imageId !== id
      ),
    ],
  });

  validateAddImage(id: string, images: Image[]): Image {
    const foundImage = images.find((i) => i.id === id);
    if (!foundImage) throw new NotFoundException('Could not find image to add');

    if (foundImage.state !== PostedState.New)
      throw new NotFoundException('Only new images can be added');

    return toImage(foundImage);
  }

  validateUpdateImage(
    id: string,
    image: ImageUpdateDto,
    images: Image[]
  ): void {
    const foundImage = images.find((i) => i.id === id);
    if (!foundImage)
      throw new NotFoundException('Could not find image to update');

    if (
      (foundImage.state === PostedState.Public ||
        foundImage.state === PostedState.Archived) &&
      image.state === PostedState.New
    ) {
      throw new NotAcceptableException(
        'Images that are public or archived cannot be changed to a state of New'
      );
    }
  }

  validateFindImage(id: string, images: Image[]): Image {
    const foundImage = images.find((i) => i.id === id);
    if (!foundImage) throw new NotFoundException('Could not find image by id');

    return toImage(foundImage);
  }
}
