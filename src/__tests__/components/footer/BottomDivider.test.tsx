import React from 'react';
import { render, queryByTestId } from '@testing-library/react';

import AppStub from 'src/test/AppStub';
import BottomDivider from 'src/components/footer/BottomDivider';

it('renders without crashing', () => {
    render(<AppStub renderItem={<BottomDivider />} />);
});

it('should render the bottom divider', () => {
    const { container } = render(<AppStub renderItem={<BottomDivider />} />);
    const bottomDivider = queryByTestId(container, 'bottom-divider');
    expect(bottomDivider).not.toBeNull();
});

