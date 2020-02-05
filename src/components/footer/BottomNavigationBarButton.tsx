import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { PageType } from 'src/enums/PageType';

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
    currentPageType: PageType;
    buttonPageType: PageType;
}

BottomNavigationBarButton.propTypes = {
    icon: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    currentPageType: PropTypes.string.isRequired,
    buttonPageType: PropTypes.string.isRequired
};

export default function BottomNavigationBarButton({
    icon,
    label,
    currentPageType,
    buttonPageType
}: Props): JSX.Element {
    const classes = useStyles();
    const history = useHistory();
    const isSelected = currentPageType === buttonPageType;
    return (
        <BottomNavigationAction
            label={label}
            className={isSelected ? classes.buttonSelected : classes.button}
            icon={<FontAwesomeIcon icon={icon} size="2x" />}
            selected={isSelected}
            data-testid={
                isSelected
                    ? 'bottom-navigation-bar-button-selected'
                    : 'bottom-navigation-bar-button'
            }
            onClick={() => {
                history.push(buttonPageType);
            }}
        />
    );
}
