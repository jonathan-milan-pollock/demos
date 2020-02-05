import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    footer: {
        height: 10
    }
});

export default function MasterFooter(): JSX.Element {
    const classes = useStyles();
    return (
        <Fragment>
            <div className={classes.footer} />
        </Fragment>
    );
}
