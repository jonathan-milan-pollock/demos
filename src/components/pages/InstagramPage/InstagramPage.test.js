import React from "react";
import { shallow } from "enzyme";

import InstagramPage from "./InstagramPage";

describe("InstagramPage", () => {
  it("should render correctly", () => {
    const component = shallow(<InstagramPage />);

    expect(component).toMatchSnapshot();
  });
});