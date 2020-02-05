import Page from 'src/models/Page';
import { PageType } from 'src/enums/PageType';

export default class ApplicationPage {
    static readonly HOME: Page = {
        pageType: PageType.Home,
        title: 'Dark Rush Photography',
        description:
            'Dark Rush Photography specializes in Professional, Drone, and VR Photography'
    };
    static readonly ABOUT: Page = {
        pageType: PageType.About,
        title: 'About',
        description: 'About Dark Rush Photography'
    };
}
