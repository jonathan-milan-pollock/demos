import { render } from '@testing-library/react';

import AdminUtil from './admin-util';

describe('AdminUtil', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminUtil />);
    expect(baseElement).toBeTruthy();
  });
});
