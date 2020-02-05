import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { PageType } from 'src/enums/PageType';
import BottomNavigationBarButton from 'src/components/footer/BottomNavigationBarButton';

const useStyles = makeStyles((theme: Theme) => {
    return {
        bottomNavigation: {
            backgroundColor: theme.palette.custom.headerBackgroundColor
        }
    };
});

interface Props {
    pageType: PageType;
    isDisplayed: boolean;
}

BottomNavigationBar.propTypes = {
    pageType: PropTypes.string.isRequired,
    isDisplayed: PropTypes.bool.isRequired
};

export default function BottomNavigationBar({
    pageType,
    isDisplayed
}: Props): JSX.Element {
    const classes = useStyles();

    const renderBottomNavigationBar = () => {
        if (!isDisplayed) {
            return <Fragment />;
        }
        return (
            <BottomNavigation
                showLabels={true}
                className={classes.bottomNavigation}
                data-testid="bottom-navigation-bar"
            >
                <BottomNavigationBarButton
                    icon={{ prefix: 'fas', iconName: 'home' }}
                    label="HOME"
                    currentPageType={pageType}
                    buttonPageType={PageType.Home}
                />
                <BottomNavigationBarButton
                    icon={{ prefix: 'fas', iconName: 'info-circle' }}
                    label="ABOUT"
                    currentPageType={pageType}
                    buttonPageType={PageType.About}
                />
            </BottomNavigation>
        );
    };

    return <Fragment>{renderBottomNavigationBar()}</Fragment>;
}
