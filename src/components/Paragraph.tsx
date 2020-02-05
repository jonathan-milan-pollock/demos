import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
    return {
        paragraph: {
            color: theme.palette.custom.textColor,
            fontFamily: theme.palette.custom.fontFamily,
            fontSize: theme.palette.custom.largeFontSize,
            fontWeight: 500,
            display: 'block',
            lineHeight: '1.8em',
            marginBlockStart: '1em',
            marginBlockEnd: '1em',
            marginInlineStart: 0,
            marginInlineEnd: 0
        }
    };
});

interface Props {
    text: string;
    className?: string;
}

Paragraph.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default function Paragraph({ text, className }: Props): JSX.Element {
    const classes = useStyles();
    let paragraphClassName = classes.paragraph;
    if (className) {
        paragraphClassName = `${classes.paragraph} ${className}`;
    }
    return <p className={paragraphClassName}>{text}</p>;
}
