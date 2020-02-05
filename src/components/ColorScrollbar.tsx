import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { makeStyles, Theme } from '@material-ui/core/styles';

interface StyleProps {
    backgroundColor: string;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        verticalThumbnail: {
            width: '10px !important',
            backgroundColor: theme.palette.custom.mainBackgroundColor
        }
    };
});

export default function ColorScrollbar(props: any): JSX.Element {
    const classes = useStyles();
    return (
        <Scrollbars
            data-testid="color-scrollbar"
            renderView={({ ...props }) => {
                return <div {...props} />;
            }}
            renderThumbVertical={({ ...props }) => {
                return <div className={classes.verticalThumbnail} {...props} />;
            }}
            {...props}
        />
    );
}
