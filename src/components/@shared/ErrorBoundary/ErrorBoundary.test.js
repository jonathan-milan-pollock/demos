import React from "react";
import { shallow } from "enzyme";

import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  it("should render correctly", () => {
    const component = shallow(<ErrorBoundary />);
    expect(component).toMatchSnapshot();
  });
});
