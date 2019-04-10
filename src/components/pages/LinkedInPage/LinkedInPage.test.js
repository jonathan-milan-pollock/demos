import React from "react";
import { shallow } from "enzyme";

import LinkedInPage from "./LinkedInPage";

describe("LinkedInPage", () => {
  it("should render correctly", () => {
    const component = shallow(<LinkedInPage />);
    expect(component).toMatchSnapshot();
  });
});