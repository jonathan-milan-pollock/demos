import { Injectable } from '@nestjs/common';

import { SocialMedia } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadNewSocialMedia,
  loadSocialMedia,
} from '../entities/social-media.functions';

@Injectable()
export class SocialMediaProvider {
  loadNewSocialMedia(group: string, slug: string): SocialMedia {
    return loadNewSocialMedia(group, slug);
  }

  loadSocialMedia(documentModel: DocumentModel): SocialMedia {
    return loadSocialMedia(documentModel);
  }
}
