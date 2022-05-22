import { Fragment } from 'react';
import PropTypes from 'prop-types';

import styles from './page-container.module.scss';
import { Layout, PageType } from '@dark-rush-photography/website/types';
import HomeTabBar from '../../header/home-tab-bar/home-tab-bar.component';
import ContactBar from '../../footer/contact-bar/contact-bar.component';
import TitleBar from '../../header/title-bar/title-bar.component';
import TopNavigationBar from '../../header/top-navigation-bar/top-navigation-bar.component';
import BottomDivider from '../../footer/bottom-divider/bottom-divider.component';
import SocialMediaBar from '../../footer/social-media-bar/social-media-bar.component';
import BottomNavigationBar from '../../footer/bottom-navigation-bar/bottom-navigation-bar.component';

interface Props {
  pageType: PageType;
  layout: Layout;
  renderItem: JSX.Element;
}

PageContainer.propTypes = {
  pageType: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  renderItem: PropTypes.object.isRequired,
};

export default function PageContainer({
  pageType,
  layout,
  renderItem,
}: Props): JSX.Element {
  const renderHomeTabBar = () => {
    if (pageType !== PageType.Home) return;

    return <HomeTabBar layout={layout} />;
  };

  const renderAdditionalContactBar = () => {
    if (!layout.isAdditionalContactBarDisplayed) return;

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
          pageType={pageType}
          isDisplayed={!layout.isLargeWindowWidth}
        />
        <TopNavigationBar
          pageType={pageType}
          isDisplayed={layout.isLargeWindowWidth}
        />
        {renderHomeTabBar()}
      </div>
      <div className={styles['main']}>{renderItem}</div>
      <div className={styles['footer']}>
        <BottomDivider />
        <SocialMediaBar isDisplayed={layout.isLargeWindowWidth} />
        <ContactBar
          isPhoneNumberDisplayed={!layout.isAdditionalContactBarDisplayed}
          isCopyrightDisplayed={true}
          isEmailDisplayed={!layout.isAdditionalContactBarDisplayed}
        />
        {renderAdditionalContactBar()}
        <BottomNavigationBar
          isDisplayed={layout.isBottomNavigationBarDisplayed}
        />
      </div>
    </Fragment>
  );
}
