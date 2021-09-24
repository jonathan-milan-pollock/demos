import { getGoogleDriveFolderWithNameExistsResponse } from './google-drive-folder-response.functions';

describe('google-drive-folder-response.functions', () => {
  describe('getGoogleDriveFolderWithNameExistsResponse', () => {
    it('should return true if 1 one or more folders are returned', () => {
      const response = { data: { files: [''] } };

      const result = getGoogleDriveFolderWithNameExistsResponse(response);
      expect(result).toBe(true);
    });

    it('should return false if there are not any folders returned', () => {
      const response = { data: { files: [] } };

      const result = getGoogleDriveFolderWithNameExistsResponse(response);
      expect(result).toBe(false);
    });
  });
});
