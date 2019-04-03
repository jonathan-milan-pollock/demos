import { findPage } from "./PageHeaderDomain";
import { pageType } from "../../../constants/PageType";

describe("PageHeaderDomain", () => {
  it("when call find page it should return facebook address", () => {
    const facebookPage = findPage(pageType.FACEBOOK);
    expect(facebookPage).toEqual("/");
  });
  it("when call find page it should return google business address", () => {
    const googleBusinessPage = findPage(pageType.GOOGLE_BUSINESS);
    expect(googleBusinessPage).toEqual("/google-business");
  });
});
