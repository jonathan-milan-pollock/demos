import { sharedData } from './shared-data';

describe('sharedData', () => {
  it('should work', () => {
    expect(sharedData()).toEqual('shared-data');
  });
});
