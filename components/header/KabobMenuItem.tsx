import React, { Fragment } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

import {
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';

import ApplicationUi from '../../constants/app-ui-constants';
import FontAwesomeIconEm from '../FontAwesomeIconEm';

type Props = {
  icon: IconProp;
  text: string;
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    menuItem: {
      backgroundColor: theme.palette.custom.headerBackgroundColor,
      '&:hover': {
        '& $icon': {
          color: ApplicationUi.PRIMARY_COLOR,
        },
        '& $text': {
          color: ApplicationUi.PRIMARY_COLOR,
        },
      },
    },
    icon: {
      color: theme.palette.custom.iconColor,
    },
    text: {
      color: theme.palette.custom.headerAccentColor,
      fontSize: '0.875rem',
      marginLeft: -20,
    },
  };
});

const KabobMenuItem = ({ icon, text }: Props) => {
  const classes = useStyles();
  return (
    <Fragment>
      <ListItemIcon className={classes.icon}>
        <FontAwesomeIconEm icon={icon} widthInEm={1} />
      </ListItemIcon>
      <ListItemText primary={text} classes={{ primary: classes.text }} />
    </Fragment>
  );
};

export default KabobMenuItem;
