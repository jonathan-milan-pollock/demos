import { render } from '@testing-library/react';

import WebsiteData from './website-data';

describe('WebsiteData', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebsiteData />);
    expect(baseElement).toBeTruthy();
  });
});
