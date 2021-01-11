import React from 'react';
import { render } from '@testing-library/react';

import MockedThemeProvider from '../../../__mocks__/MockedThemeProvider';
import TopNavigationBar from '../../../components/header/TopNavigationBar';

describe('<TopNavigationBar />', () => {
  it('renders without crashing', () => {
    render(
      <MockedThemeProvider>
        <TopNavigationBar />
      </MockedThemeProvider>
    );
  });
});
