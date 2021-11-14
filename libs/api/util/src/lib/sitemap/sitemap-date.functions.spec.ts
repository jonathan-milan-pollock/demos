import { getSitemapDate } from './sitemap-date.functions';

describe('sitemap-date.functions', () => {
  describe('getSitemapDate', () => {
    it('should return an sitemap formatted date', () => {
      const isoDate = '2011-10-08T14:48:00';
      const result = getSitemapDate(isoDate);
      expect(result).toBe('2011-10-08');
    });
  });
});
