import {
  ApplicationLayout,
  PageType,
} from '@dark-rush-photography/website/types';

export const findHeaderHeight = (
  pageType: PageType,
  windowWidth: number,
  isLargeWindowWidth: boolean
): number => {
  let headerHeight = isLargeWindowWidth
    ? ApplicationLayout.TOP_NAVIGATION_BAR_HEIGHT
    : ApplicationLayout.TITLE_BAR_HEIGHT;

  const homeTabBarHeight =
    windowWidth < ApplicationLayout.HOME_TAB_BAR_MIN_WIDTH
      ? ApplicationLayout.HOME_TAB_BAR_HEIGHT_TEXT_WRAPPED
      : ApplicationLayout.HOME_TAB_BAR_HEIGHT;
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
    footerHeight += ApplicationLayout.BOTTOM_DIVIDER_HEIGHT;
    footerHeight += ApplicationLayout.CONTACT_BAR_HEIGHT;
    footerHeight += ApplicationLayout.SOCIAL_MEDIA_BAR_HEIGHT;
    return footerHeight;
  }

  footerHeight += ApplicationLayout.BOTTOM_DIVIDER_HEIGHT;
  footerHeight += ApplicationLayout.CONTACT_BAR_HEIGHT;
  if (isAdditionalContactBarDisplayed) {
    footerHeight += ApplicationLayout.CONTACT_BAR_HEIGHT;
  }

  if (isBottomNavigationBarDisplayed) {
    footerHeight += ApplicationLayout.BOTTOM_NAVIGATION_BAR_HEIGHT;
  }

  return footerHeight;
};
