import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
    return {
        horizontalRule: {
            border: theme.palette.custom.bottomDividerBorder
        }
    };
});

function BottomDivider(): JSX.Element {
    const classes = useStyles();

    return (
        <hr className={classes.horizontalRule} data-testid="bottom-divider" />
    );
}

export default BottomDivider;
