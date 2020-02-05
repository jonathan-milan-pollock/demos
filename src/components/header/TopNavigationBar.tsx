import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { PageType } from 'src/enums/PageType';
import TopNavigationBarButton from 'src/components/header/TopNavigationBarButton';
import ThemeToggleButton from 'src/components/ThemeToggleButton';

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            backgroundColor: theme.palette.custom.headerBackgroundColor
        }
    };
});

interface Props {
    pageType: PageType;
    isDisplayed: boolean;
}

TopNavigationBar.propTypes = {
    pageType: PropTypes.string.isRequired,
    isDisplayed: PropTypes.bool.isRequired
};

export default function TopNavigationBar({
    pageType,
    isDisplayed
}: Props): JSX.Element {
    const classes = useStyles();
    const renderButtons = (): JSX.Element => {
        return (
            <Fragment>
                <TopNavigationBarButton
                    icon={{ prefix: 'fas', iconName: 'home' }}
                    text="HOME"
                    currentPageType={pageType}
                    buttonPageType={PageType.Home}
                />
                <TopNavigationBarButton
                    icon={{ prefix: 'fas', iconName: 'info-circle' }}
                    text="ABOUT"
                    currentPageType={pageType}
                    buttonPageType={PageType.About}
                />
                <ThemeToggleButton />
            </Fragment>
        );
    };

    return !isDisplayed ? (
        <Fragment />
    ) : (
        <AppBar
            position="static"
            className={classes.container}
            data-testid="top-navigation-bar"
        >
            <Toolbar>{renderButtons()}</Toolbar>
        </AppBar>
    );
}
