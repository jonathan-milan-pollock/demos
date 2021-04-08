import { serverlessFeatureImageProcessing } from './serverless-feature-image-processing';

describe('serverlessFeatureImageProcessing', () => {
  it('should work', () => {
    expect(serverlessFeatureImageProcessing()).toEqual(
      'serverless-feature-image-processing'
    );
  });
});
