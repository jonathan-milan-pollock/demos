import { render } from '@testing-library/react';

import WebsiteUtil from './website-util';

describe('WebsiteUtil', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebsiteUtil />);
    expect(baseElement).toBeTruthy();
  });
});
