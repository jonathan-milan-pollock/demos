import { render } from '@testing-library/react';

import BestOfData from './best-of-data';

describe('BestOfData', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BestOfData />);
    expect(baseElement).toBeTruthy();
  });
});
