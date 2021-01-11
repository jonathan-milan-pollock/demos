import React from 'react';

import Router from 'next/router';

import { makeStyles, Theme, BottomNavigation } from '@material-ui/core';

import BottomNavigationBarButton from './BottomNavigationBarButton';

const useStyles = makeStyles((theme: Theme) => {
  return {
    bottomNavigation: {
      backgroundColor: theme.palette.custom.headerBackgroundColor,
    },
  };
});

function BottomNavigationBar(): JSX.Element {
  const classes = useStyles();

  return (
    <BottomNavigation showLabels={true} className={classes.bottomNavigation}>
      <BottomNavigationBarButton
        icon={{ prefix: 'fas', iconName: 'home' }}
        label="HOME"
        slugs={[
          '/',
          '/stories',
          '/stories/',
          '/photo-of-the-week',
          '/photo-of-the-week/',
          '/extended-reality-studio',
          '/extended-reality-studio/',
        ]}
        onClick={() => {
          Router.push('/');
        }}
      />
      <BottomNavigationBarButton
        icon={{ prefix: 'fas', iconName: 'edit' }}
        label="REVIEWS"
        slugs={['/reviews', '/reviews/']}
        onClick={() => {
          Router.push('/reviews');
        }}
      />
      <BottomNavigationBarButton
        icon={{ prefix: 'fas', iconName: 'info-circle' }}
        label="ABOUT"
        slugs={['/about', '/about/']}
        onClick={() => {
          Router.push('/about');
        }}
      />
    </BottomNavigation>
  );
}

export default BottomNavigationBar;
