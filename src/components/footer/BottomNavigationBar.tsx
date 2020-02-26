import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import { makeStyles, Theme } from '@material-ui/core/styles';

import BottomNavigationBarButton from 'src/components/footer/BottomNavigationBarButton';

const useStyles = makeStyles((theme: Theme) => {
    return {
        bottomNavigation: {
            backgroundColor: theme.palette.custom.headerBackgroundColor
        }
    };
});

interface Props {
    isDisplayed: boolean;
}

BottomNavigationBar.propTypes = {
    isDisplayed: PropTypes.bool.isRequired
};

function BottomNavigationBar({ isDisplayed }: Props): JSX.Element {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    if (!isDisplayed) return <Fragment />;
    return (
        <BottomNavigation
            showLabels={true}
            className={classes.bottomNavigation}
            data-testid="bottom-navigation-bar"
        >
            <BottomNavigationBarButton
                icon={{ prefix: 'fas', iconName: 'home' }}
                label="HOME"
                buttonPathnames={[
                    '/',
                    '/stories',
                    '/stories/',
                    '/photo-of-the-week',
                    '/photo-of-the-week/',
                    '/extended-reality-studio',
                    '/extended-reality-studio/'
                ]}
                locationPathname={location.pathname}
                onClick={() => {
                    history.push('/');
                }}
            />
            <BottomNavigationBarButton
                icon={{ prefix: 'fas', iconName: 'info-circle' }}
                label="ABOUT"
                buttonPathnames={['/about', '/about/']}
                locationPathname={location.pathname}
                onClick={() => {
                    history.push('/about');
                }}
            />
        </BottomNavigation>
    );
}

export default BottomNavigationBar;
