import {
  EntityAdmin,
  EntityType,
  Image,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadImageAdmin } from '../images/image-load.functions';

export const loadEntityAdmin = (documentModel: DocumentModel): EntityAdmin => {
  let starredImage: Image | undefined = undefined;

  const hasStarredImage =
    documentModel.type === EntityType.Destination ||
    documentModel.type === EntityType.Event ||
    documentModel.type === EntityType.PhotoOfTheWeek;

  if (hasStarredImage) {
    const foundStarredImage = documentModel.images.find(
      (image) =>
        image.isStarred === true &&
        (image.state == ImageState.Selected || image.state == ImageState.Public)
    );
    if (foundStarredImage) {
      starredImage = foundStarredImage;
    }
  }

  if (!starredImage && documentModel.images.length > 0) {
    starredImage = documentModel.images[0];
  }

  return {
    type: documentModel.type,
    id: documentModel._id,
    group: documentModel.group,
    slug: documentModel.slug,
    order: documentModel.order,
    isPublic: documentModel.isPublic,
    title: documentModel.title ?? '',
    text: documentModel.text,
    createdDate: documentModel.createdDate ?? '',
    publishedDate: documentModel.publishedDate ?? '',
    seoDescription: documentModel.seoDescription ?? '',
    seoKeywords: documentModel.seoKeywords,
    location: documentModel.location,
    hasStarredImage: !!starredImage,
    starredImageIsCentered: documentModel.starredImageIsCentered,
    starredImage: starredImage ? loadImageAdmin(starredImage) : undefined,
    imageVideo: documentModel.imageVideo,
    tileDimension: documentModel.tileDimension,
  };
};
