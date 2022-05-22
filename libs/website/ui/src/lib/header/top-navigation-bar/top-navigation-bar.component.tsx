import PropTypes from 'prop-types';

import { AppBar, Toolbar } from '@mui/material';

import styles from './top-navigation-bar.module.scss';
import { Application, PageType } from '@dark-rush-photography/website/types';
import { findCacheBustingUrl } from '@dark-rush-photography/best-of/util';
import TopNavigationBarButton from '../top-navigation-bar-button/top-navigation-bar-button.component';
import TopNavigationBarBackButton from '../top-navigation-bar-back-button/top-navigation-bar-back-button.component';
import ThemeToggleButton from '../theme-toggle-button/theme-toggle-button.component';

interface Props {
  pageType: PageType;
  isDisplayed: boolean;
}

TopNavigationBar.propTypes = {
  pageType: PropTypes.number.isRequired,
  isDisplayed: PropTypes.bool.isRequired,
};

export default function TopNavigationBar({
  pageType,
  isDisplayed,
}: Props): JSX.Element {
  if (!isDisplayed) return <></>;

  let isBackButtonDisplayed = false;
  let goBackToPathname = null;
  if (pageType === PageType.Story) {
    isBackButtonDisplayed = true;
    goBackToPathname = '/stories';
  } else if (pageType === PageType.PhotoOfTheWeek) {
    isBackButtonDisplayed = true;
    goBackToPathname = '/photo-of-the-week';
  } else if (pageType === PageType.Review) {
    isBackButtonDisplayed = true;
    goBackToPathname = '/reviews';
  }

  return (
    <AppBar
      position="static"
      className={styles['container']}
      data-testid="top-navigation-bar"
    >
      <Toolbar className={styles['toolbar']}>
        <TopNavigationBarBackButton
          goBackToPathname={goBackToPathname}
          isDisplayed={isBackButtonDisplayed}
        />
        <TopNavigationBarButton
          icon={{ prefix: 'fas', iconName: 'home' }}
          text="HOME"
          buttonPathname="/"
          buttonPathnames={[
            '/',
            '/stories',
            '/stories/',
            '/photo-of-the-week',
            '/photo-of-the-week/',
            '/extended-reality-studio',
            '/extended-reality-studio/',
          ]}
          isDisplayed={!isBackButtonDisplayed}
        />
        <TopNavigationBarButton
          icon={{ prefix: 'fas', iconName: 'edit' }}
          text="REVIEWS"
          buttonPathname="/reviews"
          buttonPathnames={['/reviews', '/reviews/']}
          isDisplayed={!isBackButtonDisplayed}
        />
        <TopNavigationBarButton
          icon={{ prefix: 'fas', iconName: 'info-circle' }}
          text="ABOUT"
          buttonPathname="/about"
          buttonPathnames={['/about', '/about/']}
          isDisplayed={!isBackButtonDisplayed}
        />
        <img
          className={styles['image']}
          alt="Dark Rush Photography Logo"
          src={findCacheBustingUrl(Application.LOGO_URL)}
        />
        <ThemeToggleButton />
      </Toolbar>
    </AppBar>
  );
}
