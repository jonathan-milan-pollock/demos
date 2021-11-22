import { EntityAdmin } from '@dark-rush-photography/shared/types';
import { getEntityTypeHasStarredImage } from '@dark-rush-photography/shared/util';
import { DocumentModel } from '../schema/document.schema';
import { loadLocation, loadTileDimension } from './entity-load.functions';
import {
  findFirstImage,
  findStarredPublishImage,
  loadImageAdmin,
} from '../images/image-load.functions';
import { loadImageVideo } from '../images/image-video-load.functions';

export const loadEntityAdmin = (documentModel: DocumentModel): EntityAdmin => {
  const starredPublishImage = findStarredPublishImage(documentModel.images);
  const starredPublishOrFirstImage =
    starredPublishImage && getEntityTypeHasStarredImage(documentModel.type)
      ? starredPublishImage
      : findFirstImage(documentModel.images);

  return {
    type: documentModel.type,
    id: documentModel._id,
    group: documentModel.group,
    slug: documentModel.slug,
    order: documentModel.order,
    isPublic: documentModel.isPublic,
    title: documentModel.title,
    text: documentModel.text,
    createdDate: documentModel.createdDate,
    publishedDate: documentModel.publishedDate,
    seoDescription: documentModel.seoDescription,
    seoKeywords: documentModel.seoKeywords,
    location: loadLocation(documentModel.location),
    starredImageIsCentered: documentModel.starredImageIsCentered,
    starredPublishOrFirstImage: starredPublishOrFirstImage
      ? loadImageAdmin(starredPublishOrFirstImage)
      : undefined,
    imageVideo: loadImageVideo(documentModel.imageVideo),
    tileDimension: loadTileDimension(documentModel.tileDimension),
  };
};
