import React from 'react';
import Router from 'next/router';

import { makeStyles, Theme, IconButton } from '@material-ui/core';

import FontAwesomeIconEm from '../FontAwesomeIconEm';

const useStyles = makeStyles((_theme: Theme) => {
  return {
    iconButton: {
      color: 'white',
    },
  };
});

type Props = {
  goBackToPage?: string;
};

const BackButton = ({ goBackToPage }: Props) => {
  const classes = useStyles();

  return (
    <IconButton
      className={classes.iconButton}
      onClick={() => {
        if (goBackToPage) Router.push(goBackToPage);
      }}
    >
      <FontAwesomeIconEm
        icon={{ prefix: 'far', iconName: 'chevron-left' }}
        widthInEm={0.4}
      ></FontAwesomeIconEm>
    </IconButton>
  );
};

export default BackButton;
