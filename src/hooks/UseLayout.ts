import { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';

import ApplicationLayout from 'src/constants/ApplicationLayout';
import { PageType } from 'src/enums/PageType';
import Layout from 'src/models/Layout';
import { findHeaderHeight, findFooterHeight } from 'src/utils/Layout';

export function useLayout(pageType: PageType): Layout {
    const [layout, setLayout] = useState({
        width: 0,
        height: 0,
        mainHeight: 0,
        detailWidth: 0,
        headerHeight: 0,
        footerHeight: 0,
        isLargeWindowWidth: false,
        isBottomNavigationBarDisplayed: false
    });

    const windowSize = useWindowSize();

    useEffect(() => {
        const isLargeWindowWidth =
            windowSize.width >= ApplicationLayout.MASTER_WIDTH * 2;
        const headerHeight = findHeaderHeight(isLargeWindowWidth);
        const isBottomNavigationBarDisplayed = !isLargeWindowWidth;
        const footerHeight = findFooterHeight(isBottomNavigationBarDisplayed);
        const mainHeight = windowSize.height - headerHeight - footerHeight;

        setLayout({
            width: windowSize.width,
            height: windowSize.height,
            mainHeight: mainHeight,
            detailWidth: windowSize.width - ApplicationLayout.MASTER_WIDTH,
            headerHeight: headerHeight,
            footerHeight: footerHeight,
            isLargeWindowWidth: isLargeWindowWidth,
            isBottomNavigationBarDisplayed: isBottomNavigationBarDisplayed
        });
    }, [pageType, windowSize.width, windowSize.height]);

    return layout;
}
