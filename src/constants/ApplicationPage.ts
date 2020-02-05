import Page from 'src/models/Page';
import { PageType } from 'src/enums/PageType';

export default class ApplicationPage {
    static readonly HOME: Page = {
        pageType: PageType.Home,
        title: 'Magenic Masters React',
        description:
            'Magenic Masters React, teaching React, Hooks, and a little Redux'
    };
    static readonly ABOUT: Page = {
        pageType: PageType.About,
        title: 'About',
        description: 'About Magenic Masters React'
    };
}
