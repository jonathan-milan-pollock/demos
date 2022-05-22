import { render } from '@testing-library/react';

import AdminData from './admin-data';

describe('AdminData', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminData />);
    expect(baseElement).toBeTruthy();
  });
});
