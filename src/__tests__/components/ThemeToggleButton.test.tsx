import React from 'react';
import { render } from '@testing-library/react';

import AppReduxStub from 'src/test/AppReduxStub';
import ThemeToggleButton from 'src/components/ThemeToggleButton';

it('renders without crashing', () => {
    render(<AppReduxStub renderItem={<ThemeToggleButton />} />);
});
