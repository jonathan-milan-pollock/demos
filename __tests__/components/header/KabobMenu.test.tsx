import React from 'react';
import { render } from '@testing-library/react';

import MockedThemeProvider from '../../../__mocks__/MockedThemeProvider';
import KabobMenu from '../../../components/header/KabobMenu';

describe('<KabobMenu />', () => {
  it('renders without crashing', () => {
    render(
      <MockedThemeProvider>
        <KabobMenu />
      </MockedThemeProvider>
    );
  });
});
