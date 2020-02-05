import ApplicationLayout from 'src/constants/ApplicationLayout';

export const findHeaderHeight = (isLargeWindowWidth: boolean): number => {
    let headerHeight = 0;

    if (isLargeWindowWidth) {
        headerHeight += ApplicationLayout.TOP_NAVIGATION_BAR_HEIGHT;
    } else {
        headerHeight += ApplicationLayout.TITLE_BAR_HEIGHT;
    }
    return headerHeight;
};

export const findFooterHeight = (
    isBottomNavigationBarDisplayed: boolean
): number => {
    let footerHeight = 0;

    footerHeight += ApplicationLayout.BOTTOM_DIVIDER_HEIGHT;

    if (isBottomNavigationBarDisplayed) {
        footerHeight += ApplicationLayout.BOTTOM_NAVIGATION_BAR_HEIGHT;
    }

    return footerHeight;
};
