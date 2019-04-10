import React from "react";
import { shallow } from "enzyme";

import FiveHundredPixelsPage from "./FiveHundredPixelsPage";

describe("FiveHundredPixelsPage", () => {
  it("should render correctly", () => {
    const component = shallow(<FiveHundredPixelsPage />);
    expect(component).toMatchSnapshot();
  });
});