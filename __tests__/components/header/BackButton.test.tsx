import React from 'react';
import { render } from '@testing-library/react';

import MockedThemeProvider from '../../../__mocks__/MockedThemeProvider';
import BackButton from '../../../components/header/BackButton';

describe('<BackButton />', () => {
  it('renders without crashing', () => {
    render(
      <MockedThemeProvider>
        <BackButton />
      </MockedThemeProvider>
    );
  });
});
