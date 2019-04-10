import { pageType } from "../../../constants/PageType";

export const findPage = selectedPageType => {
  switch (selectedPageType) {
    case pageType.HOME:
      return "/home";
    case pageType.FACEBOOK:
      return "/facebook";
    case pageType.INSTAGRAM:
      return "/instagram";
    case pageType.LINKEDIN:
      return "/linked-in";
    default:
      throw new Error(`page for ${selectedPageType} could not be found`);
  }
};
