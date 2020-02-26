import React from 'react';
import {
    render,
    queryByTestId,
    getByTestId,
    fireEvent
} from '@testing-library/react';

import AppStub from 'src/test/AppStub';
import BottomNavigationBarButton from 'src/components/footer/BottomNavigationBarButton';

it('renders without crashing', () => {
    render(
        <AppStub
            renderItem={
                <BottomNavigationBarButton
                    icon={{ prefix: 'fas', iconName: 'home' }}
                    label="HOME"
                    buttonPathnames={[]}
                    locationPathname=""
                    onClick={() => {}}
                />
            }
        />
    );
});

it('when button pathnames contains location pathname button should be selected', () => {
    const { container } = render(
        <AppStub
            renderItem={
                <BottomNavigationBarButton
                    icon={{ prefix: 'fas', iconName: 'home' }}
                    label="HOME"
                    buttonPathnames={['/']}
                    locationPathname="/"
                    onClick={() => {}}
                />
            }
        />
    );
    const button = queryByTestId(
        container,
        'bottom-navigation-bar-button-selected'
    );
    expect(button).not.toBeNull();
});

it('when button pathnames does not contain location pathname button should not be selected', () => {
    const { container } = render(
        <AppStub
            renderItem={
                <BottomNavigationBarButton
                    icon={{ prefix: 'fas', iconName: 'info-circle' }}
                    label="ABOUT"
                    buttonPathnames={['/about']}
                    locationPathname="/"
                    onClick={() => {}}
                />
            }
        />
    );
    const button = queryByTestId(container, 'bottom-navigation-bar-button');
    expect(button).not.toBeNull();
});

it('when click button should call on click', () => {
    const mockClick = jest.fn();
    const { container } = render(
        <AppStub
            renderItem={
                <BottomNavigationBarButton
                    icon={{ prefix: 'fas', iconName: 'home' }}
                    label="HOME"
                    buttonPathnames={['/']}
                    locationPathname="/about"
                    onClick={mockClick}
                />
            }
        />
    );

    const button = getByTestId(container, 'bottom-navigation-bar-button');
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalled();
});
