import { Fragment } from 'react';

import styles from './page-container.module.scss';
import { Layout, PageType } from '@dark-rush-photography/website/types';
import HomeTabBar from '../../header/home-tab-bar/home-tab-bar.component';
import ContactBar from '../../footer/contact-bar/contact-bar.component';
import TitleBar from '../../header/title-bar/title-bar.component';
import TopNavigationBar from '../../header/top-navigation-bar/top-navigation-bar.component';
import BottomDivider from '../../footer/bottom-divider/bottom-divider.component';
import SocialMediaBar from '../../footer/social-media-bar/social-media-bar.component';
import BottomNavigationBar from '../../footer/bottom-navigation-bar/bottom-navigation-bar.component';

interface PageContainerProps {
  pageType: PageType;
  layout: Layout;
  children?: React.ReactNode;
}

export default function PageContainer(props: PageContainerProps): JSX.Element {
  const renderHomeTabBar = () => {
    if (props.pageType !== PageType.Home) return;

    return <HomeTabBar layout={props.layout} />;
  };

  const renderAdditionalContactBar = () => {
    if (!props.layout.isAdditionalContactBarDisplayed) return;

    return (
      <ContactBar
        isPhoneNumberDisplayed={true}
        isCopyrightDisplayed={false}
        isEmailDisplayed={true}
      />
    );
  };

  return (
    <Fragment>
      <div className={styles['header']}>
        <TitleBar
          pageType={props.pageType}
          isDisplayed={!props.layout.isLargeWindowWidth}
        />
        <TopNavigationBar
          pageType={props.pageType}
          isDisplayed={props.layout.isLargeWindowWidth}
        />
        {renderHomeTabBar()}
      </div>
      <div className={styles['main']}>{props.children}</div>
      <div className={styles['footer']}>
        <BottomDivider />
        <SocialMediaBar isDisplayed={props.layout.isLargeWindowWidth} />
        <ContactBar
          isPhoneNumberDisplayed={!props.layout.isAdditionalContactBarDisplayed}
          isCopyrightDisplayed={true}
          isEmailDisplayed={!props.layout.isAdditionalContactBarDisplayed}
        />
        {renderAdditionalContactBar()}
        <BottomNavigationBar
          isDisplayed={props.layout.isBottomNavigationBarDisplayed}
        />
      </div>
    </Fragment>
  );
}
