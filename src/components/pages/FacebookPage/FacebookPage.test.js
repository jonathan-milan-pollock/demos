import React from "react";
import { shallow } from "enzyme";

import { FacebookPage } from "./FacebookPage";

describe("FacebookPage", () => {
  it("should render correctly", () => {
    const component = shallow(<FacebookPage />);

    expect(component).toMatchSnapshot();
  });
});
