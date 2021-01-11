import React from 'react';

import useDarkMode from 'use-dark-mode';

import { makeStyles, Theme, Button } from '@material-ui/core';

import ApplicationUi from '../../constants/app-ui-constants';
import FontAwesomeIconEm from '../FontAwesomeIconEm';

const useStyles = makeStyles((_theme: Theme) => {
  return {
    container: {
      marginLeft: 'auto',
      alignItems: 'center',
    },
    button: {
      color: ApplicationUi.PRIMARY_COLOR,
    },
    buttonText: {
      marginLeft: '.5em',
      fontSize: '1rem',
    },
  };
});

const ThemeToggleButton = () => {
  const classes = useStyles();
  const darkMode = useDarkMode(false);

  return (
    <div className={classes.container}>
      <Button className={classes.button} onClick={() => darkMode.toggle()}>
        <FontAwesomeIconEm
          icon={{
            prefix: 'far',
            iconName: darkMode.value ? 'check-square' : 'square',
          }}
          widthInEm={1}
        ></FontAwesomeIconEm>
        <span className={classes.buttonText}>DARK MODE</span>
      </Button>
    </div>
  );
};

export default ThemeToggleButton;
