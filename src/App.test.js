import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from "enzyme";

import App from './App';
import PageHeader from "./components/@shared/PageHeader/PageHeader";
import HomePage from "./components/pages/HomePage/HomePage";
import FacebookPage from "./components/pages/FacebookPage/FacebookPage";

describe("App", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("should render correctly", () => {
    const shallowApp = shallow(<App />);
    expect(shallowApp).toMatchSnapshot();
  });
  it("should find page header when rendered", () => {
    const mountedApp = mount(<App />);
    expect(mountedApp.find(PageHeader).length).toBe(1);
  });
  it("should find Home Page by default", () => {
    const mountedApp = mount(<App />);
    expect(mountedApp.find(HomePage).length).toBe(1);
  });
  it("should find Facebook Page when Facebook icon clicked", () => {
    const mountedApp = mount(<App />);
    mountedApp
      .find('button#facebook-button')
      .simulate('click')
    expect(mountedApp.find(FacebookPage).length).toBe(1);
  });
});
