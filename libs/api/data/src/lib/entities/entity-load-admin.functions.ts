import { EntityAdmin } from '@dark-rush-photography/shared/types';
import { getEntityTypeHasStarredImage } from '@dark-rush-photography/shared/util';
import { DocumentModel } from '../schema/document.schema';
import {
  findFirstImage,
  findStarredPublishImage,
  loadImageAdmin,
} from '../images/image-load.functions';

export const loadEntityAdmin = (documentModel: DocumentModel): EntityAdmin => {
  const starredPublishImage = findStarredPublishImage(documentModel.images);
  const starredPublishOrFirstImage =
    getEntityTypeHasStarredImage(documentModel.type) && starredPublishImage
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
    location: documentModel.location,
    starredImageIsCentered: documentModel.starredImageIsCentered,
    starredPublishOrFirstImage: starredPublishOrFirstImage
      ? loadImageAdmin(starredPublishOrFirstImage)
      : undefined,
    imageVideo: documentModel.imageVideo,
    tileDimension: documentModel.tileDimension,
  };
};
