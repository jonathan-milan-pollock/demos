import { pageType } from "../../../constants/PageType";

export const findPage = (selectedPageType) => {
  switch (selectedPageType) {
    case pageType.FACEBOOK:
      return "/";
    case pageType.GOOGLE_BUSINESS:
      return "/google-business";
    default:
      throw new Error(`page for ${selectedPageType} could not be found`);
  }
};
