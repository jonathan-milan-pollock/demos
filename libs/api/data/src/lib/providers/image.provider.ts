import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

import {
  Image,
  ImageDimension,
  PostState,
} from '@dark-rush-photography/shared-types';
import { ImageAddDto, ImageUpdateDto } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../functions/image.functions';

@Injectable()
export class ImageProvider {
  toImage = (image: Image): Image => toImage(image);

  addImage = (
    id: string,
    entityId: string,
    imageAdd: ImageAddDto,
    images: Image[]
  ): Partial<DocumentModel> => ({
    images: [
      ...images,
      {
        ...imageAdd,
        id,
        entityId,
        postState: PostState.New,
        order: 0,
        isStared: false,
        isLoved: false,
        isLiked: false,
        isProcessed: false,
        isLocked: false,
      },
    ],
  });

  updateImage = (
    id: string,
    foundImage: Image,
    imageUpdate: ImageUpdateDto,
    images: Image[]
  ): Partial<DocumentModel> => ({
    images: [
      ...images.filter((i) => i.id !== id),
      { ...foundImage, ...imageUpdate },
    ],
  });

  validateUpdateImage(
    id: string,
    imagePostState: PostState,
    images: Image[]
  ): Image {
    const foundImage = images.find((i) => i.id === id);
    if (!foundImage)
      throw new NotFoundException('Could not find image to update');

    if (
      (foundImage.postState === PostState.Public ||
        foundImage.postState === PostState.Archived) &&
      imagePostState === PostState.New
    ) {
      throw new NotAcceptableException(
        'Images that are public or archived cannot be changed to a state of New'
      );
    }
    return foundImage;
  }

  findImageBySlug = (slug: string, images: Image[]): Image | undefined => {
    return images.find((i) => i.fileName === slug);
  };

  validateFindImage(id: string, images: Image[]): Image {
    const foundImage = images.find((i) => i.id === id);
    if (!foundImage) throw new NotFoundException('Could not find image by id');

    return foundImage;
  }

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
}
