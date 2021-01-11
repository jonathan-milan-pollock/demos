import React from 'react';
import { render } from '@testing-library/react';

import MockedThemeProvider from '../../__mocks__/MockedThemeProvider';
import IndexPage from '../../pages/index';

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(
      <MockedThemeProvider>
        <IndexPage />
      </MockedThemeProvider>
    );
  });
});
