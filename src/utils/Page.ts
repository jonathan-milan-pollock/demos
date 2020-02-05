import { PageType } from 'src/enums/PageType';
import ApplicationPage from 'src/constants/ApplicationPage';
import Page from 'src/models/Page';
import Application from 'src/constants/Application';

export const findPage = (pageType: PageType): Page => {
    switch (pageType) {
        case PageType.Home:
            return ApplicationPage.HOME;
        case PageType.About:
            return ApplicationPage.ABOUT;
        default:
            throw new Error(`${pageType} is invalid for finding a page`);
    }
};

export const findPageUrl = (pageType: PageType): string => {
    return `${Application.URL}${pageType}`;
};

export const findPagePathname = (pageType: PageType): string => {
    return `/${pageType}`;
};
