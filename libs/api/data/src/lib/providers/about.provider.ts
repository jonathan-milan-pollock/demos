import { Injectable } from '@nestjs/common';

import { About, AboutDto } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadPublicContent } from '../content/public-content.functions';
import {
  loadAbout,
  loadAboutPublic,
  loadNewAbout,
} from '../entities/about.functions';

@Injectable()
export class AboutProvider {
  loadNewAbout(slug: string): About {
    return loadNewAbout(slug);
  }

  loadAbout(documentModel: DocumentModel): About {
    return loadAbout(documentModel);
  }

  loadAboutPublic(documentModel: DocumentModel): AboutDto {
    return loadAboutPublic(documentModel, loadPublicContent(documentModel));
  }
}
