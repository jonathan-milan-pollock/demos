import React from 'react';

import { makeStyles, Theme, BottomNavigationAction } from '@material-ui/core';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

import ApplicationUi from '../../constants/app-ui-constants';
import FontAwesomeIconEm from '../FontAwesomeIconEm';

const useStyles = makeStyles((theme: Theme) => {
  return {
    button: {
      color: theme.palette.custom.bottomButtonColor,
      paddingTop: '6px !important',
      '&:active': {
        color: ApplicationUi.PRIMARY_COLOR,
      },
      '& span': {
        color: theme.palette.custom.bottomButtonColor,
        fontSize: '1rem',
        marginTop: 3,
        opacity: 'unset !important',
      },
    },
    buttonSelected: {
      paddingTop: '6px !important',
      '& span': {
        color: ApplicationUi.PRIMARY_COLOR,
        fontSize: '1rem',
        marginTop: 3,
      },
    },
  };
});

interface Props {
  icon: IconProp;
  label: string;
  slugs: string[];
  onClick(): void;
}

const BottomNavigationBarButton = ({
  icon,
  label,
  slugs,
  onClick,
}: Props): JSX.Element => {
  const classes = useStyles();

  const isSelected = slugs.includes(location.pathname);
  return (
    <BottomNavigationAction
      className={isSelected ? classes.buttonSelected : classes.button}
      selected={isSelected}
      icon={<FontAwesomeIconEm widthInEm={1.5} icon={icon} />}
      label={label}
      onClick={onClick}
    />
  );
};

export default BottomNavigationBarButton;
