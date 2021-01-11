import React from 'react';
import { render } from '@testing-library/react';

import MockedThemeProvider from '../../../__mocks__/MockedThemeProvider';
import TopTabBar from '../../../components/header/TopTabBar';

describe('<TopTabBar />', () => {
  it('renders without crashing', () => {
    render(
      <MockedThemeProvider>
        <TopTabBar />
      </MockedThemeProvider>
    );
  });
});
