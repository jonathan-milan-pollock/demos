import { PageType } from '../enums/PageType';

export default interface Page {
    pageType: PageType;
    title?: string;
    description?: string;
}
