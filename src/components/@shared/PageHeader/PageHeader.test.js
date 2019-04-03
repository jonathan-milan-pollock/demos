import React from "react";
import { shallow } from "enzyme";

import PageHeader from "./PageHeader";

describe("PageHeader", () => {
  it("should render correctly", () => {
    const component = shallow(<PageHeader />);

    expect(component).toMatchSnapshot();
  });
});
