import { serverlessUtilTesting } from './serverless-util-testing';

describe('serverlessUtilTesting', () => {
  it('should work', () => {
    expect(serverlessUtilTesting()).toEqual('serverless-util-testing');
  });
});
