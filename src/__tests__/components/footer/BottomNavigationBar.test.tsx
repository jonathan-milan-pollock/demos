import React from 'react';
import { render, queryByTestId } from '@testing-library/react';

import AppStub from 'src/test/AppStub';
import BottomNavigationBar from 'src/components/footer/BottomNavigationBar';

it('renders without crashing', () => {
    render(
        <AppStub renderItem={<BottomNavigationBar isDisplayed={false} />} />
    );
});

it('when displayed then should be rendered', () => {
    const { container } = render(
        <AppStub renderItem={<BottomNavigationBar isDisplayed={true} />} />
    );
    const bottomNavigationBar = queryByTestId(
        container,
        'bottom-navigation-bar'
    );
    expect(bottomNavigationBar).not.toBeNull();
});

it('when not displayed should not be rendered', () => {
    const { container } = render(
        <AppStub renderItem={<BottomNavigationBar isDisplayed={false} />} />
    );
    const bottomNavigationBar = queryByTestId(
        container,
        'bottom-navigation-bar'
    );
    expect(bottomNavigationBar).toBeNull();
});
