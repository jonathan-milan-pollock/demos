import { Injectable } from '@nestjs/common';

import {
  PhotoOfTheWeek,
  PhotoOfTheWeekDto,
  PhotoOfTheWeekMinimalDto,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadPublicContent } from '../content/public-content.functions';
import {
  loadMinimalPhotoOfTheWeekPublic,
  loadNewPhotoOfTheWeek,
  loadPhotoOfTheWeek,
  loadPhotoOfTheWeekPublic,
} from '../entities/photo-of-the-week.functions';

@Injectable()
export class PhotoOfTheWeekProvider {
  loadNewPhotoOfTheWeek(group: string, slug: string): PhotoOfTheWeek {
    return loadNewPhotoOfTheWeek(group, slug);
  }

  loadPhotoOfTheWeek(documentModel: DocumentModel): PhotoOfTheWeek {
    return loadPhotoOfTheWeek(documentModel);
  }

  loadMinimalPhotoOfTheWeekPublic(
    documentModel: DocumentModel
  ): PhotoOfTheWeekMinimalDto {
    return loadMinimalPhotoOfTheWeekPublic(
      documentModel,
      loadPublicContent(documentModel)
    );
  }

  loadPhotoOfTheWeekPublic(documentModel: DocumentModel): PhotoOfTheWeekDto {
    return loadPhotoOfTheWeekPublic(
      documentModel,
      loadPublicContent(documentModel)
    );
  }
}
