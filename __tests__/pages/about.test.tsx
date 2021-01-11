import React from 'react';
import { render } from '@testing-library/react';

import MockedThemeProvider from '../../__mocks__/MockedThemeProvider';
import AboutPage from '../../pages/about';

describe('about.tsx', () => {
  it('renders without crashing', () => {
    render(
      <MockedThemeProvider>
        <AboutPage />
      </MockedThemeProvider>
    );
  });
});
