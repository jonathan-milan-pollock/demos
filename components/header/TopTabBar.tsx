import React, { useState } from 'react';

import Router from 'next/router';

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Paper, useMediaQuery, lighten } from '@material-ui/core';

import ApplicationUi from '../../constants/app-ui-constants';
import { HomePageType } from '../../models/home-page-type';
import FontAwesomeIconEm from '../FontAwesomeIconEm';

const useStyles = makeStyles((theme: Theme) => {
  return {
    tabs: {
      height: '100%',
      backgroundColor: lighten(
        theme.palette.custom.headerBackgroundColor,
        0.15
      ),
    },
    tab: {
      width: '25%',
      minWidth: 70,
      color: theme.palette.custom.headerAccentColor,
      fontWeight: 500,
      opacity: 1,
    },
    tabSelected: {
      width: '25%',
      minWidth: 70,
      color: ApplicationUi.PRIMARY_COLOR,
      fontWeight: 500,
      opacity: 1,
    },
    tabIndicator: {
      backgroundColor: ApplicationUi.PRIMARY_COLOR,
    },
  };
});

const TopTabBar = () => {
  const classes = useStyles();
  const textChangeWidth = useMediaQuery('(min-width:600px)');

  const [currentPageType, setCurrentPageType] = useState(() => {
    switch (location.pathname) {
      case '/stories':
      case '/stories/':
        return HomePageType.Stories;
      case '/photo-of-the-week':
      case '/photo-of-the-week/':
        return HomePageType.PhotoOfTheWeek;
      case '/extended-reality':
      case '/extended-reality/':
        return HomePageType.ExtendedReality;
      default:
        return HomePageType.HomePageImages;
    }
  });

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentPageType(newValue);
    switch (newValue) {
      case HomePageType.HomePageImages:
        Router.push('/');
        break;
      case HomePageType.Stories:
        Router.push('/stories');
        break;
      case HomePageType.PhotoOfTheWeek:
        Router.push('/photo-of-the-week');
        break;
      case HomePageType.ExtendedReality:
        Router.push('/extended-reality');
        break;
    }
  };

  return (
    <AppBar position="static">
      <Paper>
        <Tabs
          value={currentPageType}
          onChange={handleChange}
          className={classes.tabs}
          classes={{
            indicator: classes.tabIndicator,
          }}
          centered
        >
          <Tab
            className={
              location.pathname === '/' ? classes.tabSelected : classes.tab
            }
            label="PHOTOS"
            value={HomePageType.HomePageImages}
            icon={
              <FontAwesomeIconEm
                icon={{
                  prefix: 'fas',
                  iconName: 'camera-alt',
                }}
                widthInEm={1.5}
              />
            }
          />
          <Tab
            className={
              location.pathname === '/stories' ||
              location.pathname === `/stories/`
                ? classes.tabSelected
                : classes.tab
            }
            label="STORIES"
            value={HomePageType.Stories}
            icon={
              <FontAwesomeIconEm
                icon={{
                  prefix: 'far',
                  iconName: 'book-open',
                }}
                widthInEm={1.5}
              />
            }
          />
          <Tab
            className={
              location.pathname === '/photo-of-the-week' ||
              location.pathname === '/photo-of-the-week/'
                ? classes.tabSelected
                : classes.tab
            }
            label={`${textChangeWidth ? 'PHOTO OF THE WEEK' : 'WEEKLY PHOTO'}`}
            value={HomePageType.PhotoOfTheWeek}
            icon={
              <FontAwesomeIconEm
                icon={{
                  prefix: 'far',
                  iconName: 'calendar',
                }}
                widthInEm={1.5}
              />
            }
          />
          <Tab
            className={
              location.pathname === '/extended-reality' ||
              location.pathname === '/extended-reality/'
                ? classes.tabSelected
                : classes.tab
            }
            label={`${textChangeWidth ? 'EXTENDED REALITY' : 'XR'}`}
            value={HomePageType.ExtendedReality}
            icon={
              <FontAwesomeIconEm
                icon={{
                  prefix: 'far',
                  iconName: 'vr-cardboard',
                }}
                widthInEm={1.5}
              />
            }
          />
        </Tabs>
      </Paper>
    </AppBar>
  );
};

export default TopTabBar;
