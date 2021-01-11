import React, { Fragment, ReactNode } from 'react';

import Head from 'next/head';

import { makeStyles, Theme } from '@material-ui/core';

import Application from '../constants/app-constants';
import AppUiConstants from '../constants/app-ui-constants';
import TopNavigationBar from '../components/header/TopNavigationBar';
import TopTabBar from '../components/header/TopTabBar';
import BottomNavigationBar from '../components/footer/BottomNavigationBar';

//const SIDEBAR_WIDTH = 480;
// Add comment

const BOTTOM_MOBILE_HEIGHT = AppUiConstants.BOTTOM_NAVIGATION_BAR_HEIGHT;
const BOTTOM_DESKTOP_HEIGHT = AppUiConstants.BOTTOM_SOCIAL_MEDIA_BAR_HEIGHT;

const useStyles = makeStyles((theme: Theme) => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    minWidth: '288px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.custom.topHeaderBackgroundColor,
  },
  topNavigationBar: {
    height: AppUiConstants.TOP_NAVIGATION_BAR_HEIGHT,
  },
  topTabBarContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  topTabBar: {
    marginTop: 'auto',
  },
  content: {
    height: `calc(100% - ${
      AppUiConstants.DIVIDER_HEIGHT + BOTTOM_MOBILE_HEIGHT
    }px)`,
    [theme.breakpoints.up('lg')]: {
      height: `calc(100% - ${
        AppUiConstants.DIVIDER_HEIGHT + BOTTOM_DESKTOP_HEIGHT
      }px)`,
    },
  },
  divider: {
    height: AppUiConstants.DIVIDER_HEIGHT,
    marginTop: 'auto',
    backgroundColor: 'darkgray',
  },
  footer: {
    height: BOTTOM_MOBILE_HEIGHT,
    backgroundColor: 'blue',
    [theme.breakpoints.up('lg')]: {
      height: BOTTOM_DESKTOP_HEIGHT,
    },
  },
  bottomNavigationBar: {
    height: AppUiConstants.BOTTOM_NAVIGATION_BAR_HEIGHT,
    backgroundColor: 'gray',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  bottomSocialMediaBar: {
    height: AppUiConstants.BOTTOM_SOCIAL_MEDIA_BAR_HEIGHT,
    backgroundColor: 'gray',
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },
}));

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = Application.NAME }: Props) => {
  const classes = useStyles();

  //TODO: Add description
  //TODO: Add pageUrl
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={classes.page}>
        <header className={classes.header}>
          <nav className={classes.topNavigationBar}>
            <TopNavigationBar />
          </nav>
          <nav className={classes.topTabBarContainer}>
            <div className={classes.topTabBar}>
              <TopTabBar />
            </div>
          </nav>
        </header>
        <div className={classes.content}>{children}</div>
        <div className={classes.divider}></div>
        <footer className={classes.footer}>
          <div className={classes.bottomSocialMediaBar}></div>
          <div className={classes.bottomNavigationBar}>
            <BottomNavigationBar />
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default Layout;
