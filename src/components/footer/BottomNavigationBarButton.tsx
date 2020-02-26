import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
    return {
        button: {
            color: theme.palette.custom.bottomButtonColor,
            paddingTop: '6px !important',
            '&:active': {
                color: theme.palette.custom.accentColor
            },
            '& span': {
                color: theme.palette.custom.bottomButtonColor,
                fontSize: theme.palette.custom.bottomButtonFontSize,
                marginTop: 3,
                opacity: 'unset !important'
            }
        },
        buttonSelected: {
            paddingTop: '6px !important',
            '& span': {
                color: theme.palette.custom.accentColor,
                marginTop: 3,
                fontSize: `${theme.palette.custom.bottomButtonFontSize} !important`
            }
        }
    };
});

interface Props {
    icon: IconProp;
    label: string;
    buttonPathnames: Array<string>;
    locationPathname: string;
    onClick(): void;
}

BottomNavigationBarButton.propTypes = {
    icon: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    buttonPathnames: PropTypes.array.isRequired,
    locationPathname: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default function BottomNavigationBarButton({
    icon,
    label,
    buttonPathnames,
    locationPathname,
    onClick
}: Props): JSX.Element {
    const classes = useStyles();

    const isSelected = buttonPathnames.includes(locationPathname);
    return (
        <BottomNavigationAction
            className={isSelected ? classes.buttonSelected : classes.button}
            selected={isSelected}
            icon={<FontAwesomeIcon icon={icon} size="2x" />}
            label={label}
            data-testid={
                isSelected
                    ? 'bottom-navigation-bar-button-selected'
                    : 'bottom-navigation-bar-button'
            }
            onClick={onClick}
        />
    );
}
