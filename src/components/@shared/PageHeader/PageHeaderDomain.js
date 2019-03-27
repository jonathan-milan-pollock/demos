import { pageType } from "../../../constants/PageType";

export const changePage = (selectedPageType, history) => {
  switch (selectedPageType) {
    case pageType.FACEBOOK:
      history.push("/");
      break;
    case pageType.GOOGLE_BUSINESS:
      history.push("/google-business");
      break;
    default:
      break;
  }
};
