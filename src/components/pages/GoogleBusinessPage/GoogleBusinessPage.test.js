import React from "react";
import { shallow } from "enzyme";

import GoogleBusinessPage from "./GoogleBusinessPage";

describe("GoogleBusinessPage", () => {
  it("should render correctly", () => {
    const component = shallow(<GoogleBusinessPage />);

    expect(component).toMatchSnapshot();
  });
});