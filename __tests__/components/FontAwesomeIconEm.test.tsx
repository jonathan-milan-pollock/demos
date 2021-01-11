import React from 'react';
import { render } from '@testing-library/react';

import MockedThemeProvider from '../../__mocks__/MockedThemeProvider';
import FontAwesomeIconEm from '../../components/FontAwesomeIconEm';

describe('<FontAwesomeIconEm />', () => {
  it('renders without crashing', () => {
    render(
      <MockedThemeProvider>
        <FontAwesomeIconEm
          icon={{
            prefix: 'far',
            iconName: 'vr-cardboard',
          }}
          widthInEm={1.5}
        />
      </MockedThemeProvider>
    );
  });
});
