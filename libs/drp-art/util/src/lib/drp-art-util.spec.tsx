import { render } from '@testing-library/react';

import DrpArtUtil from './drp-art-util';

describe('DrpArtUtil', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DrpArtUtil />);
    expect(baseElement).toBeTruthy();
  });
});
