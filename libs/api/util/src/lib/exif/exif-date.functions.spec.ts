import { getExifDateFromIsoDate } from './exif-date.functions';

describe('exif-date.functions', () => {
  describe('getExifDateFromIsoDate', () => {
    it('should return an exif formatted date from an iso date', () => {
      const isoDate = '2011-10-08T14:48:00';
      const result = getExifDateFromIsoDate(isoDate);
      expect(result).toBe('2011:10:08 14:48:00');
    });
  });
});
