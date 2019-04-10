import React from "react";
import { shallow } from "enzyme";

import HomePage from "./HomePage";

describe("HomePage", () => {
  it("should render correctly", () => {
    const component = shallow(<HomePage />);

    expect(component).toMatchSnapshot();
  });
});