import { serverlessData } from './serverless-data';

describe('serverlessData', () => {
  it('should work', () => {
    expect(serverlessData()).toEqual('serverless-data');
  });
});
