import { findPage } from "./PageHeaderDomain";
import { pageType } from "../../../constants/PageType";

describe("PageHeaderDomain", () => {
  it("when call find page with Instagram page type it should return Instagram address", () => {
    const facebookPage = findPage(pageType.FACEBOOK);
    expect(facebookPage).toEqual("/facebook");
  });
  it("when call find page with Instagram page type it should return Instagram address", () => {
    const instagramPage = findPage(pageType.INSTAGRAM);
    expect(instagramPage).toEqual("/instagram");
  });
});
