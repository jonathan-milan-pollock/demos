import {
  ImageDimensionState,
  ImageDimensionType,
  PostedState,
  VideoDimensionState,
  VideoDimensionType,
} from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';

describe('about.functions', () => {
  const documentModel = {
    _id: 'id',
    slug: 'slug',
    images: [
      {
        id: 'id',
        entityId: 'entityId',
        slug: 'slug',
        state: PostedState.New,
        order: 10,
        isStared: true,
        isLoved: true,
        isLiked: true,
        title: 'title',
        description: 'description',
        keywords: 'keywords',
        dateCreated: 'dateCreated',
        datePublished: 'datePublished',
      },
    ],
    imageDimensions: [
      {
        id: 'id',
        entityId: 'entityId',
        imageId: 'imageId',
        type: ImageDimensionType.Tile,
        state: ImageDimensionState.Uploaded,
        pixels: {
          width: 10,
          height: 20,
        },
        threeSixtyImageSettings: {
          pitch: 30,
          yaw: 40,
          hfov: 50,
        },
      },
    ],
    videos: [
      {
        id: 'id',
        entityId: 'entityId',
        slug: 'slug',
        state: PostedState.New,
        order: 10,
        isStared: true,
        title: 'title',
        description: 'description',
        keywords: 'keywords',
        dateCreated: 'dateCreated',
        datePublished: 'datePublished',
        imageId: 'imageId',
        hasTrack: false,
        isFlyOver: false,
      },
    ],
    videoDimensions: [
      {
        id: 'id',
        entityId: 'entityId',
        videoId: 'videoId',
        type: VideoDimensionType.Tile,
        state: VideoDimensionState.Uploaded,
        pixels: {
          width: 10,
          height: 20,
        },
      },
    ],
  } as DocumentModel;

  describe('fromDocumentModel', () => {
    /*it('should set id from document model', () => {
      const documentId = '0001';
      const result = fromDocumentModel({
        ...documentModel,
        _id: documentId,
      } as DocumentModel);
      expect(result.id).toBe(documentId);
    });

    it('should set all fields from document model', () => {
      const documentId = '0001';
      const result = fromDocumentModel({
        ...documentModel,
        _id: documentId,
      } as DocumentModel);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...about } = documentModel;
      expect(result).toEqual({ ...about, id: documentId });
    });*/
  });
});
