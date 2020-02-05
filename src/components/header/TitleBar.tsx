import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Theme } from '@material-ui/core/styles';

import TitleBarKabobMenu from './TitleBarKabobMenu';

const useStyles = makeStyles((theme: Theme) => {
    return {
        outerContainer: {
            backgroundColor: theme.palette.custom.headerBackgroundColor
        },
        container: {
            minHeight: '56px !important'
        }
    };
});

interface Props {
    isDisplayed: boolean;
}

TitleBar.propTypes = {
    isDisplayed: PropTypes.bool.isRequired
};

export default function TitleBar({ isDisplayed }: Props): JSX.Element {
    const classes = useStyles();

    return !isDisplayed ? (
        <Fragment />
    ) : (
        <AppBar
            position="static"
            className={classes.outerContainer}
            data-testid="title-bar"
        >
            <Toolbar className={classes.container}>
                <TitleBarKabobMenu />
            </Toolbar>
        </AppBar>
    );
}
