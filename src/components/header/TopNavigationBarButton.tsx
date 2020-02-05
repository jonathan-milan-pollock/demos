import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { PageType } from 'src/enums/PageType';
import { findPagePathname } from 'src/utils/Page';

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            padding: '0 0.25em'
        },
        button: {
            color: theme.palette.custom.headerAccentColor,
            margin: 10,
            '&:hover': {
                color: theme.palette.custom.accentColor
            }
        },
        buttonSelected: {
            margin: 10,
            color: theme.palette.custom.accentColor
        },
        buttonText: {
            fontSize: theme.palette.custom.smallFontSize
        },
        icon: {
            marginRight: 10
        }
    };
});

interface Props {
    icon: IconProp;
    text: string;
    currentPageType: PageType;
    buttonPageType: PageType;
}

TopNavigationBarButton.propTypes = {
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    currentPageType: PropTypes.string.isRequired,
    buttonPageType: PropTypes.string.isRequired
};

export default function TopNavigationBarButton({
    icon,
    text,
    currentPageType,
    buttonPageType
}: Props): JSX.Element {
    const classes = useStyles();
    const history = useHistory();
    const isSelected = currentPageType === buttonPageType;
    const dataTestId = isSelected
        ? 'top-navigation-bar-button-selected'
        : 'top-navigation-bar-button';

    return (
        <span className={classes.container}>
            <Button
                className={isSelected ? classes.buttonSelected : classes.button}
                onClick={() => history.push(findPagePathname(buttonPageType))}
                data-testid={dataTestId}
            >
                <FontAwesomeIcon
                    className={classes.icon}
                    icon={icon}
                    size="lg"
                />
                <span className={classes.buttonText}>{text}</span>
            </Button>
        </span>
    );
}
