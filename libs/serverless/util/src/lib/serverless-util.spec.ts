import { serverlessUtil } from './serverless-util';

describe('serverlessUtil', () => {
  it('should work', () => {
    expect(serverlessUtil()).toEqual('serverless-util');
  });
});
