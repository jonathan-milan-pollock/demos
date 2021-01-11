import React from 'react';
import { render } from '@testing-library/react';

import MockedThemeProvider from '../../../__mocks__/MockedThemeProvider';
import KabobMenuItem from '../../../components/header/KabobMenuItem';
import Test from '../../../__constants__/test-constants';

describe('<KabobMenuItem />', () => {
  it('renders without crashing', () => {
    render(
      <MockedThemeProvider>
        <KabobMenuItem text='' />
      </MockedThemeProvider>
    );
  });
});
