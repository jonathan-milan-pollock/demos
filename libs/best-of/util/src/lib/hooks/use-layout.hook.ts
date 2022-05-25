import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import { useWindowSize, useOrientation } from 'react-use';

import {
  APPLICATION_LAYOUT_CONTACT_BAR_MIN_WIDTH,
  APPLICATION_LAYOUT_MASTER_WIDTH,
  Layout,
  PageType,
} from '@dark-rush-photography/best-of/types';
import {
  findFooterHeight,
  findHeaderHeight,
} from '../functions/layout.functions';

export function useLayout(pageType: PageType): Layout {
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
    detailWidth: 0,
    headerHeight: 0,
    mainHeight: 0,
    footerHeight: 0,
    isLargeWindowWidth: false,
    isAdditionalContactBarDisplayed: false,
    isBottomNavigationBarDisplayed: false,
  });

  const router = useRouter();
  const windowSize = useWindowSize();
  const orientation = useOrientation();

  useEffect(() => {
    const isLargeWindowWidth =
      windowSize.width >= APPLICATION_LAYOUT_MASTER_WIDTH * 2;
    const headerHeight = findHeaderHeight(
      pageType,
      windowSize.width,
      isLargeWindowWidth
    );

    const isBottomNavigationBarDisplayed =
      !isLargeWindowWidth &&
      pageType !== PageType.Story &&
      pageType !== PageType.PhotoOfTheWeek &&
      pageType !== PageType.Review;
    const isAdditionalContactBarDisplayed =
      windowSize.width <= APPLICATION_LAYOUT_CONTACT_BAR_MIN_WIDTH;
    const footerHeight = findFooterHeight(
      isLargeWindowWidth,
      isAdditionalContactBarDisplayed,
      isBottomNavigationBarDisplayed
    );
    const mainHeight = windowSize.height - headerHeight - footerHeight;

    setLayout({
      width: windowSize.width,
      height: windowSize.height,
      detailWidth: windowSize.width - APPLICATION_LAYOUT_MASTER_WIDTH,
      headerHeight: headerHeight,
      mainHeight: mainHeight,
      footerHeight: footerHeight,
      isLargeWindowWidth: isLargeWindowWidth,
      isAdditionalContactBarDisplayed: isAdditionalContactBarDisplayed,
      isBottomNavigationBarDisplayed: isBottomNavigationBarDisplayed,
    });
  }, [
    pageType,
    router.pathname,
    orientation,
    orientation.angle,
    orientation.type,
    windowSize.width,
    windowSize.height,
  ]);

  return layout;
}
