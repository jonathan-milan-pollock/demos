import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            backgroundColor: theme.palette.custom.textBackgroundColor,
            width: '95%',
            margin: 'auto',
            marginTop: 13,
            padding: 15,
            borderRadius: 40,
            textAlign: 'center'
        },
        title: {
            color: theme.palette.custom.textColor,
            fontFamily: theme.palette.custom.fontFamily,
            fontSize: theme.palette.custom.largeFontSize,
            fontWeight: 'bold',
            lineHeight: '1.3em',
            letterSpacing: '0.05em',
            paddingTop: 5
        }
    };
});

interface Props {
    title?: string;
    className?: string;
    renderItem: JSX.Element;
}

TextContainer.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    renderItem: PropTypes.object.isRequired
};

export default function TextContainer({
    title,
    className,
    renderItem
}: Props): JSX.Element {
    const classes = useStyles();
    let textContainerClassName = classes.container;
    if (className) {
        textContainerClassName = `${classes.container} ${className}`;
    }
    const renderTitle = (title?: string): JSX.Element | null => {
        if (!title) return null;

        return <p className={classes.title}>{title}</p>;
    };

    return (
        <div className={textContainerClassName}>
            {renderTitle(title)}
            {renderItem}
        </div>
    );
}
