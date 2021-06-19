import { HttpService, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Destination, DocumentType } from '@dark-rush-photography/shared-types';
import { EnvServerless } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../functions/image.functions';
import { toImageDimension } from '../functions/image-dimension.functions';
import { toVideo } from '../functions/video.functions';
import { toVideoDimension } from '../functions/video-dimension.functions';
import { toComment } from '../functions/comment.functions';
import { toEmotion } from '../functions/emotion.functions';
import { postEntity$ } from '../functions/entity-post.functions';
import { findPublicContent } from '../functions/public.functions';

@Injectable()
export class DestinationProvider {
  fromDocumentModel(documentModel: DocumentModel): Destination {
    return {
      id: documentModel._id,
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
      videos: documentModel.videos.map((video) => toVideo(video)),
      videoDimensions: documentModel.videoDimensions.map((videoDimension) =>
        toVideoDimension(videoDimension)
      ),
      hasExtendedReality: documentModel.hasExtendedReality,
      websiteUrl: documentModel.websiteUrl,
      socialMediaUrls: documentModel.socialMediaUrls,
      comments: documentModel.comments.map((comment) => toComment(comment)),
      emotions: documentModel.emotions.map((emotion) => toEmotion(emotion)),
    };
  }

  fromDocumentModelPublic(documentModel: DocumentModel): Destination {
    const publicContent = findPublicContent(documentModel);
    return {
      id: documentModel._id,
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
      videos: publicContent.videos,
      videoDimensions: publicContent.videoDimensions,
      hasExtendedReality: documentModel.hasExtendedReality,
      websiteUrl: documentModel.websiteUrl,
      socialMediaUrls: documentModel.socialMediaUrls,
      comments: publicContent.comments,
      emotions: publicContent.emotions,
    };
  }

  post$(
    envServerless: EnvServerless,
    httpService: HttpService,
    id: string
  ): Observable<Destination> {
    return postEntity$(
      envServerless,
      httpService,
      id,
      DocumentType.Destination
    ).pipe(map((response) => this.fromDocumentModel(response)));
  }
}
