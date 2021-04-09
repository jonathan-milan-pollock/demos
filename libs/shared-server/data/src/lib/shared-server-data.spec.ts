import { sharedServerData } from './shared-server-data';

describe('sharedServerData', () => {
  it('should work', () => {
    expect(sharedServerData()).toEqual('shared-server-data');
  });
});
