import React from 'react';

import Router from 'next/router';

import { makeStyles, Theme, Button } from '@material-ui/core';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

import ApplicationUi from '../../constants/app-ui-constants';
import FontAwesomeIconEm from '../FontAwesomeIconEm';

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      padding: '0 0.25em',
    },
    button: {
      color: theme.palette.custom.topHeaderAccentColor,
      '&:hover': {
        color: ApplicationUi.PRIMARY_COLOR,
      },
    },
    buttonSelected: {
      color: ApplicationUi.PRIMARY_COLOR,
    },
    buttonText: {
      marginLeft: '.25em',
      fontSize: '1rem',
    },
    icon: {
      marginRight: 10,
    },
  };
});

interface Props {
  icon: IconProp;
  text: string;
  slug: string;
  slugs: Array<string>;
}

const TopNavigationBarButton = ({ icon, text, slug, slugs }: Props) => {
  const classes = useStyles();

  const isSelected = slugs.includes(location.pathname);
  return (
    <span className={classes.container}>
      <Button
        className={isSelected ? classes.buttonSelected : classes.button}
        onClick={() => Router.push(slug)}
      >
        <FontAwesomeIconEm icon={icon} widthInEm={1.3}></FontAwesomeIconEm>
        <span className={classes.buttonText}>{text}</span>
      </Button>
    </span>
  );
};

export default TopNavigationBarButton;
