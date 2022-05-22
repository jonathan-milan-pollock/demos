import { render } from '@testing-library/react';

import DrpArtData from './drp-art-data';

describe('DrpArtData', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DrpArtData />);
    expect(baseElement).toBeTruthy();
  });
});
