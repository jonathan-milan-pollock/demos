import { Injectable } from '@nestjs/common';

import {
  EntityType,
  PhotoOfTheWeek,
} from '@dark-rush-photography/shared-types';
import { PhotoOfTheWeekCreateDto } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../functions/image.functions';
import { toImageDimension } from '../functions/image-dimension.functions';
import { toComment } from '../functions/comment.functions';
import { toEmotion } from '../functions/emotion.functions';
import { findPublicContent } from '../functions/public.functions';

@Injectable()
export class PhotoOfTheWeekProvider {
  newPhotoOfTheWeek(photoOfTheWeek: PhotoOfTheWeekCreateDto): PhotoOfTheWeek {
    return {
      type: EntityType.PhotoOfTheWeek,
      group: photoOfTheWeek.group,
      slug: photoOfTheWeek.slug,
      isPublic: false,
      keywords: [],
      useTileImage: false,
      text: [],
      images: [],
      imageDimensions: [],
      videos: [],
      videoDimensions: [],
      comments: [],
      emotions: [],
    } as PhotoOfTheWeek;
  }

  fromDocumentModel = (documentModel: DocumentModel): PhotoOfTheWeek => {
    return {
      id: documentModel._id,
      group: documentModel.group,
      slug: documentModel.slug,
      isPublic: documentModel.isPublic,
      title: documentModel.title,
      description: documentModel.description,
      keywords: documentModel.keywords,
      datePublished: documentModel.datePublished,
      location: documentModel.location,
      useTileImage: documentModel.useTileImage,
      text: documentModel.text,
      images: documentModel.images.map((image) => toImage(image)),
      imageDimensions: documentModel.imageDimensions.map((imageDimension) =>
        toImageDimension(imageDimension)
      ),
      comments: documentModel.comments.map((comment) => toComment(comment)),
      emotions: documentModel.emotions.map((emotion) => toEmotion(emotion)),
    };
  };

  fromDocumentModelPublic = (documentModel: DocumentModel): PhotoOfTheWeek => {
    const publicContent = findPublicContent(documentModel);
    return {
      id: documentModel._id,
      group: documentModel.group,
      slug: documentModel.slug,
      isPublic: documentModel.isPublic,
      title: documentModel.title,
      description: documentModel.description,
      keywords: documentModel.keywords,
      datePublished: documentModel.datePublished,
      location: documentModel.location,
      useTileImage: documentModel.useTileImage,
      text: documentModel.text,
      images: publicContent.images,
      imageDimensions: publicContent.imageDimensions,
      comments: publicContent.comments,
      emotions: publicContent.emotions,
    };
  };
}
