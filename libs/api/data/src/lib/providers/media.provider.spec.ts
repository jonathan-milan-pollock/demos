import { BadRequestException } from '@nestjs/common';

import { DocumentType, MediaType } from '@dark-rush-photography/shared-types';

describe('media-type.functions', () => {
  describe('findDocumentTypeFromMediaType', () => {
    /* it('should return media apple icon document type for apple icon media type', () => {
      const mediaType = MediaType.AppleIcon;
      const documentType = DocumentType.MediaAppleIcon;

      const result = findDocumentTypeFromMediaType(mediaType);
      expect(result).toBe(documentType);
    });

    it('should return media apple resource document type for apple resource media type', () => {
      const mediaType = MediaType.AppleResource;
      const documentType = DocumentType.MediaAppleResource;

      const result = findDocumentTypeFromMediaType(mediaType);
      expect(result).toBe(documentType);
    });

    it('should return media image video document type for image video media type', () => {
      const mediaType = MediaType.ImageVideo;
      const documentType = DocumentType.MediaImageVideo;

      const result = findDocumentTypeFromMediaType(mediaType);
      expect(result).toBe(documentType);
    });

    it('should return media mobile image document type for mobile image media type', () => {
      const mediaType = MediaType.MobileImage;
      const documentType = DocumentType.MediaMobileImage;

      const result = findDocumentTypeFromMediaType(mediaType);
      expect(result).toBe(documentType);
    });

    it('should return media png document type for png media type', () => {
      const mediaType = MediaType.Png;
      const documentType = DocumentType.MediaPng;

      const result = findDocumentTypeFromMediaType(mediaType);
      expect(result).toBe(documentType);
    });

    it('should throw a bad request exception if the media type is not valid', () => {
      const mediaType = '' as MediaType;
      expect(() => {
        findDocumentTypeFromMediaType(mediaType);
      }).toThrow(BadRequestException);
    });

    it('should throw message unable to find media type when not valid', () => {
      const mediaType = 'invalidMediaType' as MediaType;
      expect(() => {
        findDocumentTypeFromMediaType(mediaType);
      }).toThrow(`Unable to find media type invalidMediaType`);
    });*/
  });
});
