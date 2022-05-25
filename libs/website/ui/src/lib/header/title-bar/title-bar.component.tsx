import { AppBar, Toolbar } from '@mui/material';

import styles from './title-bar.module.scss';
import { Application, PageType } from '@dark-rush-photography/website/types';
import { findCacheBustingUrl } from '@dark-rush-photography/website/util';
import TitleBarBackButton from '../title-bar-back-button/title-bar-back-button.component';
import TitleBarKabobMenu from '../title-bar-kabob-menu/title-bar-kabob-menu.component';

interface Props {
  pageType: PageType;
  isDisplayed: boolean;
}

export default function TitleBar({
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
      className={styles['outerContainer']}
      data-testid="title-bar"
    >
      <Toolbar className={styles['container']}>
        <TitleBarBackButton
          isDisplayed={isBackButtonDisplayed}
          goBackToPathname={goBackToPathname}
        />
        <img
          className={styles['image']}
          alt="Dark Rush Photography Logo"
          src={findCacheBustingUrl(Application.LOGO_URL)}
        />
        <TitleBarKabobMenu />
      </Toolbar>
    </AppBar>
  );
}
