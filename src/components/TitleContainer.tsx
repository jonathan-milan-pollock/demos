import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            backgroundColor: theme.palette.custom.textBackgroundColor,
            width: '95%',
            margin: 'auto',
            marginTop: 16,
            padding: 10,
            borderRadius: 40,
            textAlign: 'center'
        },
        title: {
            color: theme.palette.custom.accentColor,
            fontFamily: theme.palette.custom.fontFamily,
            fontSize: theme.palette.custom.largeFontSize,
            fontWeight: 'bold',
            lineHeight: '1.3em',
            letterSpacing: '0.05em'
        }
    };
});

interface Props {
    title: string;
}

TitleContainer.propTypes = {
    title: PropTypes.string.isRequired
};

export default function TitleContainer({ title }: Props): JSX.Element {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <p className={classes.title}>{title}</p>
        </div>
    );
}
