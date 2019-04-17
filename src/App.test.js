import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from "enzyme";

import {App} from './App';
import {PageHeader} from "./components/@shared/PageHeader/PageHeader";
import {HomePage} from "./components/pages/HomePage/HomePage";
import {FacebookPage} from "./components/pages/FacebookPage/FacebookPage";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
const middlewares = [thunk]; 
const mockStore = configureStore(middlewares);

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

    const getState = {tinyPng: {isLoading: false}};
    const store = mockStore(getState);
    const mountedApp = mount(<Provider store={store}><App /></Provider>);
    mountedApp
      .find('button#facebook-button')
      .simulate('click')
    expect(mountedApp.find(FacebookPage).length).toBe(1);
  });
});
