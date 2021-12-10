import {
  APPLICATION_LAYOUT_BOTTOM_DIVIDER_HEIGHT,
  APPLICATION_LAYOUT_BOTTOM_NAVIGATION_BAR_HEIGHT,
  APPLICATION_LAYOUT_CONTACT_BAR_HEIGHT,
  APPLICATION_LAYOUT_HOME_TAB_BAR_HEIGHT,
  APPLICATION_LAYOUT_HOME_TAB_BAR_HEIGHT_TEXT_WRAPPED,
  APPLICATION_LAYOUT_HOME_TAB_BAR_MIN_WIDTH,
  APPLICATION_LAYOUT_SOCIAL_MEDIA_BAR_HEIGHT,
  APPLICATION_LAYOUT_TITLE_BAR_HEIGHT,
  APPLICATION_LAYOUT_TOP_NAVIGATION_BAR_HEIGHT,
  PageType,
} from '@dark-rush-photography/best-of/types';

export const findHeaderHeight = (
  pageType: PageType,
  windowWidth: number,
  isLargeWindowWidth: boolean
): number => {
  let headerHeight = isLargeWindowWidth
    ? APPLICATION_LAYOUT_TOP_NAVIGATION_BAR_HEIGHT
    : APPLICATION_LAYOUT_TITLE_BAR_HEIGHT;

  const homeTabBarHeight =
    windowWidth < APPLICATION_LAYOUT_HOME_TAB_BAR_MIN_WIDTH
      ? APPLICATION_LAYOUT_HOME_TAB_BAR_HEIGHT_TEXT_WRAPPED
      : APPLICATION_LAYOUT_HOME_TAB_BAR_HEIGHT;
  if (pageType === PageType.Home) {
    headerHeight += homeTabBarHeight;
  }

  return headerHeight;
};

export const findFooterHeight = (
  isLargeWindowWidth: boolean,
  isAdditionalContactBarDisplayed: boolean,
  isBottomNavigationBarDisplayed: boolean
): number => {
  let footerHeight = 0;

  if (isLargeWindowWidth) {
    footerHeight += APPLICATION_LAYOUT_BOTTOM_DIVIDER_HEIGHT;
    footerHeight += APPLICATION_LAYOUT_CONTACT_BAR_HEIGHT;
    footerHeight += APPLICATION_LAYOUT_SOCIAL_MEDIA_BAR_HEIGHT;
    return footerHeight;
  }

  footerHeight += APPLICATION_LAYOUT_BOTTOM_DIVIDER_HEIGHT;
  footerHeight += APPLICATION_LAYOUT_CONTACT_BAR_HEIGHT;
  if (isAdditionalContactBarDisplayed) {
    footerHeight += APPLICATION_LAYOUT_CONTACT_BAR_HEIGHT;
  }

  if (isBottomNavigationBarDisplayed) {
    footerHeight += APPLICATION_LAYOUT_BOTTOM_NAVIGATION_BAR_HEIGHT;
  }

  return footerHeight;
};
